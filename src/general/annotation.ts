/**
 * A tab to display that may have one or more sections.
 * These sections are stored as properties of this tab.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplayTab {
  [key: string]: DisplaySection | string | number
  /** Title of this tab (Preferably fairly short) */
  _title: string
  /** Description of this tab (displayed at the top of the tab) */
  _description: string
  /** Order in which this tab will be displayed */
  _index: number
}
/**
 * A Section that may have one or more entries (or other sections)
 * These entries are stored as properties of this section.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplaySection {
  [key: string]: DisplayEntry | DisplaySection | string | number
  /** Title of this section (Preferably fairly short) */
  _title: string
  /** Description of this section (displayed under a help button) */
  _description: string
  /** Order in which this section will be displayed */
  _index: number
}
/**
 * A 'leaf' entry; the actual stored values.
 */
export interface DisplayEntry {
  /** Title of this entry (displayed beside it) */
  _title: string
  /** Order in which this entry will be displayed */
  _index: number
  /** Type of stored data; used to validate */
  _dataType: dataType
  /** Long description of data stored */
  _description: string
  /** If there is a minimum possible value, set it */
  _min?: any
  /** If there is a maximum possible value, set it */
  _max?: any
  /** Restricts user input to the specified options */
  _options?: any[]
}

/** Possible datatypes to be stored.  Note that number is stored as float or integer */
export type dataType = 'string' | 'float' | 'integer' | 'object' | 'array' | 'boolean'
