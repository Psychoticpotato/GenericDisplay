import { generateElement } from './JSX.js'
import { DisplayTab, DisplaySection, DisplayEntry } from '../general/annotation.js'
import { appendToClass, addToArray } from './generateHelp.js'
/**
 * The top-level tab
 * @param attrs Any attributes set in a key:value style
 *              'tab' is always appended to 'class
 */
export function newTab(displayTab: DisplayTab, fullId: string, attrs?: any) {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  // Append 'tab' to attrs
  appendToClass(attrs, 'tab')
  // Apply the id and name
  attrs.id = fullId
  attrs.name = displayTab.__name
  /** The various sections for this tab */
  const sections: HTMLElement[] = []
  /** Offset for section insertion */
  let offset = 0
  // Begin filling in the sections
  for (const key in displayTab) {
    // Skip the key if it begins with '_'
    if (key.startsWith('_')) {
      continue
    }
    /** Index of the current section */
    const index = (displayTab[key] as DisplaySection)._index
    /** The section to create */
    const section = newSection(displayTab[key] as DisplaySection, `${fullId}.${key}`)
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

export function newSection(displaySection: DisplaySection, fullId: string, attrs?: any): HTMLElement | null {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  // Apply the id and legend
  attrs.id = fullId
  attrs.legend = displaySection.__legend
  // Append 'section' to attrs class
  appendToClass(attrs, 'section')
  const children: HTMLElement[] = []
  /** The offset in the event of duplicate indexes */
  let offset = 0
  // Begin filling in the sections
  for (const key in displaySection) {
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
      childElem = newEntry(displaySection[key] as DisplayEntry, `${fullId}.${key}`)
    } else {
      // Push the child info to the array
      childElem = newSection(displaySection[key] as DisplaySection, `${fullId}.${key}`)
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

export function newEntry(displayEntry: DisplayEntry, fullId: string, attrs?: any): HTMLElement {
  // Load in a blank attributes object as required
  attrs = attrs || {}
  // Apply the id and name
  attrs.id = fullId
  attrs.name = displayEntry._title
  // Set as required (this will be overridden below if specified)
  attrs.required = true
  // Apply each double underscore as Attributes
  for (const key in displayEntry) {
    // We need to see what kind of item we have
    if (displayEntry.hasOwnProperty(key)) {
      switch (true) {
        case (key.startsWith('__')):
          // Remove the double underscore and set the attribute
          attrs[key.replace('__', '')] = displayEntry[key]
          break
      }
    }

  }
  // TODO: Add support for arrays
  // Return the constructed label
  return <label>{displayEntry.__name}: <input {...attrs} /> </label>
}
