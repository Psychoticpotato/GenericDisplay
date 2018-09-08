import { generateElement } from './JSX.js'
import { DisplayTab, DisplaySection, DisplayEntry } from '../general/annotation.js'
import { addToArray, applyAttribute } from './generateHelp.js'
/**
 * The top-level tab
 * @param attrs Any attributes set in a key:value style
 *              'tab' is always appended to 'class
 */
export function newTab(displayTab: DisplayTab, attrs?: any) {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  /** The various sections for this tab */
  const sections: HTMLElement[] = []
  /** Offset for section insertion */
  let offset = 0
  // Begin filling in the sections
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
    /** Index of the current section */
    const index = (displayTab[key] as DisplaySection)._index
    /** The section to create */
    const section = newSection(displayTab[key] as DisplaySection)
    // Adjust the offset and add to the array (if it exists)
    if (section) {
      offset = addToArray(sections, section, index, offset)
    }
  }
  // TODO: TAB SUPPORT
  // const tabHeaderInfo: HTMLElement = <label>
  //   <input type='radio' {...attrs} />
  // </label>
  // Finally, return the constructed tab
  const tab: HTMLElement = <div {...attrs}>
    {...sections}
  </div>
  //    {fullId}<br />

  // And return the constructed tab
  return tab
}

export function newSection(displaySection: DisplaySection, attrs?: any): HTMLElement | null {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  const children: HTMLElement[] = []
  /** The offset in the event of duplicate indexes */
  let offset = 0
  // Begin filling in the sections
  for (const key in displaySection) {
    // Escape if we have a static val
    if (!displaySection.hasOwnProperty(key)) {
      continue
    }
    // Append any attributes
    applyAttribute(attrs, key, displaySection)
    // Skip the key if it begins with '_'
    if (key.startsWith('_')) {
      continue
    }
    // TODO: Set ID's with dot notation
    /** The current child to add */
    const childObj = displaySection[key]
    /** The HTML Element to add */
    let childElem
    /** Index of this child */
    const index = (displaySection[key] as DisplayEntry)._index
    // Do we have another section, or an entry?
    if (childObj.hasOwnProperty('__type')) {
      childElem = newEntry(displaySection[key] as DisplayEntry)
    } else {
      // Push the child info to the array
      childElem = newSection(displaySection[key] as DisplaySection)
    }
    // Add to array and modify offset (if it exists)
    if (childElem) {
      offset = addToArray(children, childElem, index, offset)
    }
  }
  // Finally, return the section (if it exists)
  if (children.length === 0) {
    return null
  }
  // Create a div for the child objects to reside

  return <fieldset {...attrs}> <legend>{displaySection._legend}</legend> {...children} </fieldset>
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
  // TODO: Add support for arrays
  // Return the constructed label
  return <label>{displayEntry.__name}: <input {...attrs} /> </label>
}
