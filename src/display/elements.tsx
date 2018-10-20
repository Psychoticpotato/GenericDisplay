import { generateElement } from './JSX.js'
import { DisplayTab, DisplayGroup, DisplayEntry } from '../general/annotation.js'
import { addToArray, applyAttribute } from './generateHelp.js'
/**
 * The top-level tab
 * @param attrs Any attributes set in a key:value style
 *              'tab' is always appended to 'class
 */
export function newTab(displayTab: DisplayTab, attrs?: any) {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  /** The various groups for this tab */
  const groups: HTMLElement[] = []
  /** Offset for group insertion */
  let offset = 0
  // Begin filling in the groups
  for (const key in displayTab) {
    if (!displayTab.hasOwnProperty(key)) {
      continue
    }
    // Append any attributes
    applyAttribute(attrs, key, displayTab)
    // Skip the key if it begins with '_'
    if (key.startsWith('_')) {
      continue
    }
    /** Index of the current group */
    const index = (displayTab[key] as DisplayGroup)._index
    /** The group to create */
    const group = newGroup(displayTab[key] as DisplayGroup)
    // Adjust the offset and add to the array (if it exists)
    if (group) {
      offset = addToArray(groups, group, index, offset)
    }
  }
  // TODO: TAB SUPPORT
  // const tabHeaderInfo: HTMLElement = <label>
  //   <input type='radio' {...attrs} />
  // </label>
  // Finally, return the constructed tab
  const tab: HTMLElement = <section {...attrs}>
    <h2><a href={'#' + displayTab.__id}>{displayTab.__name}</a></h2>
    <div class='display-tab-body'>{...groups}</div>
  </section>
  //    {fullId}<br />
  // TODO: Tab Support Link below!
  // TODO: https://www.sitepoint.com/css3-tabs-using-target-selector/
  // And return the constructed tab
  return tab
}

export function newGroup(displayGroup: DisplayGroup, attrs?: any): HTMLElement | null {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  const children: HTMLElement[] = []
  /** The offset in the event of duplicate indexes */
  let offset = 0
  // Begin filling in the groups
  for (const key in displayGroup) {
    // Escape if we have a static val
    if (!displayGroup.hasOwnProperty(key)) {
      continue
    }
    // Append any attributes
    applyAttribute(attrs, key, displayGroup)
    // Skip the key if it begins with '_'
    if (key.startsWith('_')) {
      continue
    }
    // TODO: Set ID's with dot notation
    /** The current child to add */
    const childObj = displayGroup[key]
    /** The HTML Element to add */
    let childElem
    /** Index of this child */
    const index = (displayGroup[key] as DisplayEntry)._index
    // Do we have another group, or an entry?
    if (childObj.hasOwnProperty('__type')) {
      childElem = newEntry(displayGroup[key] as DisplayEntry)
    } else {
      // Push the child info to the array
      childElem = newGroup(displayGroup[key] as DisplayGroup)
    }
    // Add to array and modify offset (if it exists)
    if (childElem) {
      offset = addToArray(children, childElem, index, offset)
    }
  }
  // Finally, return the group (if it exists)
  if (children.length === 0) {
    return null
  }
  // Create a div for the child objects to reside

  return <fieldset {...attrs}> <legend>{displayGroup._legend}</legend> {...children} </fieldset>
}

export function newEntry(displayEntry: DisplayEntry, attrs?: any): HTMLElement {
  // Load in a blank attributes object as required
  attrs = attrs || {}

  attrs.name = displayEntry._title
  // Set as required (this will be overridden below if specified)
  attrs.required = true
  // Apply each double underscore as Attributes
  for (const key in displayEntry) {
    // We need to see what kind of item we have
    if (displayEntry.hasOwnProperty(key)) {
      // Append any attributes
      applyAttribute(attrs, key, displayEntry)
    }

  }
  /** We apply the different classes if we have a checkbox or other value */
  const divClass = displayEntry.__type === 'checkbox' ? 'entry-div display-checkbox' : 'entry-div display-other'
  // TODO: Add support for arrays
  // Return the constructed label
  return <div class={divClass}><label>{displayEntry.__name}: <input {...attrs} /> </label></div>
}
// return <div class={divClass}><label>{displayEntry.__name}: <input {...attrs} /> </label></div>
// return <label class={labelClass}>{displayEntry.__name}: <input {...attrs} /> </label>
