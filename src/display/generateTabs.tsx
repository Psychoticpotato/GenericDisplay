import * as DataDisplay from '../general/dataDisplay.js'
import { newTab } from './elements.js'
import { tabsFromObj } from '../general/annotationBlank.js'

/**
 * Generates a list of html tabs with the specified info.
 * If 'DataDisplay' does not have annotation, a generic set will be generated
 * @param  {[type]}  input           DataDisplay object
 * @param  {Boolean} [devMode=false] PLANNED FEATURE: GUI to modify GUI
 * @return {[type]}                  List of HTML tabs; BASIC CSS TO FOLLOW
 */
export function generateTabs(input: DataDisplay.DataDisplay /*, devMode = false */): HTMLElement[] {
  /** Tab elements to return */
  const tabs: HTMLElement[] = []

  for (const key in input.annotation) {
    if (input.annotation.hasOwnProperty(key)) {
      // Generate the new tab
      tabs.push(newTab(input.annotation[key]))
    }
  }
  // If we have an empty tab array, we have to generate it another way
  if (tabs.length === 0) {
    const objTab = tabsFromObj(input.data[0])
    objTab.forEach((tab) => {
      tabs.push(newTab(tab))
    })
  }

  return tabs
}
