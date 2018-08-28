import * as fs from 'fs'
import * as annotation from './annotation'

/* TODO: THIS IS A TEST.
 * This is to see if abstract or interface work better for DataDisplay.
 */

/**
 * This will identify a class as being displayable from a JSON/object
 * This allows for a generic GUI to modify a JSON/object
 */
export interface DataDisplay {
  /**
   * The actual attributes that will be read.
   * Various items will be saved, all the same format
   */
  data: { [key: string]: any }[]
  /** The tabs storing the description of the data (The structure needs to match 1:1 with data) */
  annotation: { [key: string]: annotation.DisplayTab }
  /** The path to the annotation file */
  annotationPath: string
}

/**
 * Loads annotation for the DataDisplay
 */
export function loadAnnotation(value: DataDisplay) {
  // Create the file, if it doesn't already exist
  fs.exists(value.annotationPath, (exists) => {
    // If the file doesn't exist, escape!
    if (!exists) { return }
    // Load in the file
    fs.readFile(value.annotationPath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err)
        throw err
      }
      // Put our info into the annotation
      value.annotation = JSON.parse(data)
    })
  })
}
