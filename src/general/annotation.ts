import { DataType } from './types'
/**
 * A tab to display that may have one or more sections.
 * These sections are stored as properties of this tab.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplayTab {
  [key: string]: DisplaySection | string | number | undefined
  /** Title of this tab (Preferably fairly short) */
  __name: string
  /** Description of this tab (displayed at the top of the tab) */
  _description: string
  /** Order in which this tab will be displayed */
  _index: number
  /** Top Level entries go here */
  AAATopLevel?: DisplaySection
}
/**
 * A Section that may have one or more entries (or other sections)
 * These entries are stored as properties of this section.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplaySection {
  [key: string]: DisplayEntry | DisplaySection | string | number
  /** Title of this section (Preferably fairly short) */
  _legend: string
  /** Description of this section (displayed under a help button) */
  _description: string
  /** Order in which this section will be displayed */
  _index: number
}
/**
 * A 'leaf' entry; the actual stored values.
 * All '__' objects are direct HTML5 attributes (min/max/value, etc)
 */
export interface DisplayEntry {
  [key: string]: any
  /** Tooltip of this entry (displayed on hover) */
  __title: string
  /** Name of this entry (displayed beside) */
  __name: string
  /** Order in which this entry will be displayed */
  _index: number
  /** Type of stored data; used to validate */
  __type: DataType
  /** If there is a minimum possible value, set it */
  __min?: any
  /** If there is a maximum possible value, set it */
  __max?: any
  /** If a number steps in a specific way (see HTML5 specs) */
  __step?: any
  /** Max number of characters for a string */
  __maxLength?: number
  /** default value */
  __value?: any
}
