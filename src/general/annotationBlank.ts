import { DisplayTab, DisplaySection, DisplayEntry } from './annotation.js'
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
      }
      index++
      // Now, loop through each of the subkeys
      const sectionList = sectionOrEntryList(input[key])
      sectionList.forEach((item) => {
        // Check if we have a section or entry
        // console.log(item)
        if (item.hasOwnProperty('_legend')) {
          curTab[item._legend] = item as DisplaySection
        } else if (item.hasOwnProperty('__name')) {
          curTab[item.__name] = item as any
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
 * Creates a Section or Entry list
 * @param  input   Object to check.  SubObjects become new sections
 * @param  index=0 Current index offset (defaults to 0)
 * @return         Array with sections and/or entries
 */
export function sectionOrEntryList(input: any, index = 0) {
  // TODO: Should subObjects be at the top by default? (probably)
  /** Array to return */
  const children: (DisplayEntry | DisplaySection)[] = []
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
        // Grab the individual section here
        const subSect: DisplaySection = {
          _legend: key,
          _index: index,
          _description: 'DESCRIPTION NOT SET',
        }
        const subChild = sectionOrEntryList(subObj)
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
        children.push(entryFromObj(subObj, index, key))
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
export function entryFromObj(input: any, index: number, key: string) {
  /** The type of the input */
  const type = getType(input)
  /** The entry that we will return */
  const entry: DisplayEntry = {
    __title: 'TOOLTIP NOT SET',
    __name: key,
    _index: index,
    __type: type,
  }
  // If we are numeric, we have special considerations
  if (type === 'number') {
    // We always set the step to any; this will probably be adjusted
    entry.__step = 'any'
  }

  return entry
}
