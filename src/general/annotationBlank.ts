import { DisplayTab, DisplayGroup, DisplayEntry } from './annotation.js'
import { getType } from './types.js'

/**
 * Creates a tab from the given object
 * @param  input Object used to create a gui
 * @return       A list of html tabs
 */
export function tabsFromObj(input: any) {
  /** Index to increment */
  let index = 0
  /** List of tabs to return */
  const tabs: DisplayTab[] = []
  // Loop through each key
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const curTab: DisplayTab = {
        __name: key,
        _index: index,
        _description: 'DESCRIPTION NOT SET',
        __id: key,
        __class: 'display-tab',
      }
      index++
      // Now, loop through each of the subkeys
      const groupList = groupOrEntryList(input[key], key)
      groupList.forEach((item) => {
        // Check if we have a group or entry
        // console.log(item)
        if (item.hasOwnProperty('_legend')) {
          curTab[item._legend] = item as DisplayGroup
        } else if (item.hasOwnProperty('__name')) {
          // If we have an entry, we need to push it to the __TopLevel group
          if (!curTab.AAATopLevel) {
            // Set the top level if it doesn't already exist
            curTab.AAATopLevel = {
              _legend: 'Top Level',
              _index: 0,
              _description: 'Top Level items stored here',
              __id: 'AAATopLevel',
              __class: 'display-group',
            }
          }
          // Apply this entry to the top level
          curTab.AAATopLevel[item.__name] = item
        } else {
          console.error('Unrecognized entry:')
          console.error(item)
        }
      })
      console.log(curTab)
      // Push into our array
      tabs.push(curTab)
    }
  }
  // Return array
  return tabs
}

/**
 * Creates a Group or Entry list
 * @param  input   Object to check.  SubObjects become new groups
 * @param  index=0 Current index offset (defaults to 0)
 * @return         Array with groups and/or entries
 */
export function groupOrEntryList(input: any, fullId: string, index = 0) {
  // TODO: Should subObjects be at the top by default? (probably)
  /** Array to return */
  const children: (DisplayEntry | DisplayGroup)[] = []
  // Loop through all the keys
  for (const key in input) {
    // With 'hasOwnProperty()', we ignore static members
    if (input.hasOwnProperty(key)) {
      // Ignore anything that starts with "_"
      if (key.startsWith('_')) {
        console.log('ignoring: ' + key)
        continue
      }
      const subObj: {} = input[key]
      // console.log(typeof subObj)
      if (typeof subObj === 'object') {
        // Grab the individual group here
        const subSect: DisplayGroup = {
          _legend: key,
          _index: index,
          _description: 'DESCRIPTION NOT SET',
          __id: fullId,
          __class: 'display-group',
        }
        const subChild = groupOrEntryList(subObj, `${fullId}.${key}`)
        // Add each property to the subObj
        subChild.forEach((item) => {
          // Check what kind of property we have
          if (item.hasOwnProperty('_legend')) {
            subSect[item._legend] = item
          } else if (item.hasOwnProperty('__name')) {
            subSect[item.__name] = item
          }
        })
        children.push(subSect)
      } else {
        children.push(entryFromObj(subObj, index, key, `${fullId}.${key}`))
      }
      index++
    }
  }
  return children
}
/**
 * Create a new Entry from the given object
 * @param  input Object used to generate the entry
 * @param  index Current index offset
 * @param  key   Key (name) of this object
 * @return       Created Entry
 */
export function entryFromObj(input: any, index: number, key: string, fullId: string) {
  /** The type of the input */
  const type = getType(input)
  /** The entry that we will return */
  const entry: DisplayEntry = {
    __title: 'TOOLTIP NOT SET',
    __name: key,
    _index: index,
    __type: type,
    __id: fullId,
    __class: 'display-entry',
  }
  // If we are numeric, we have special considerations
  if (type === 'number') {
    // We always set the step to any; this will probably be adjusted
    entry.__step = 'any'
  }

  return entry
}
