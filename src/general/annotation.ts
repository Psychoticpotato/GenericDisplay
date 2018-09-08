import { DataType } from './types'
/**
 * A tab to display that may have one or more groups.
 * These groups are stored as properties of this tab.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplayTab {
  [key: string]: DisplayGroup | string | number | undefined
  /** Title of this tab (Preferably fairly short) */
  __name: string
  /** Description of this tab (displayed at the top of the tab) */
  _description: string
  /** Order in which this tab will be displayed */
  _index: number
  /** ID applied in the html tag */
  __id: string
  /** Any classes associated with this element */
  __class: string
  /** Top Level entries go here.
   * It is advisable to store all entries in objects, though.
   */
  AAATopLevel?: DisplayGroup
}
/**
 * A Group that may have one or more entries (or other groups)
 * These entries are stored as properties of this group.
 * The only three reserved names are `_title`, `_index`, and '_description'
 */
export interface DisplayGroup {
  [key: string]: DisplayEntry | DisplayGroup | string | number
  /** Title of this group (Preferably fairly short) */
  _legend: string
  /** Description of this group (displayed under a help button) */
  _description: string
  /** Order in which this group will be displayed */
  _index: number
  /** ID applied in the html tag */
  __id: string
  /** Any classes associated with this element */
  __class: string
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
  /** ID applied in the html tag */
  __id: string
  /** Any classes associated with this element */
  __class: string
}
