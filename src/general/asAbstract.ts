import * as fs from 'fs'
import * as annotation from './annotation'

/* TODO: THIS IS A TEST.
 * This is to see if abstract or interface work better for DataDisplay.
 */

/**
 * This will identify a class as being displayable from a JSON/object
 * This allows for a generic GUI to modify a JSON/object
 */
export abstract class DataDisplay {
  /**
   * The actual attributes that will be read.
   * Various items will be saved, all the same format
   */
  public data: { [key: string]: any }[]
  /** The description of said attributes (These need to match 1:1 to the data) */
  public annotation: { [key: string]: annotation.DisplayTab }
  /** The path to the annotation file */
  protected abstract annotationPath: string
  /**
   * Creates a new dataDisplay from the stringified JSON
   */
  constructor(data: string) {
    // Load in the annotation
    this.loadAnnotation()
    // Now, grab the attributes
    this.data = JSON.parse(data)
  }
  /**
   * Loads annotation for this DataDisplay
   * A check is done to see if it is already loaded
   */
  public loadAnnotation() {
    // First, give us a blank object, if nothing else.
    this.annotation = {}
    // If we have no path, do not try to load
    // Same way if we have already loaded
    if (this.annotation || !this.annotationPath) { return }
    // Create the file, if it doesn't already exist
    fs.exists(this.annotationPath, (exists) => {
      // If the file doesn't exist, escape!
      if (!exists) { return }
      // Load in the file
      fs.readFile(this.annotationPath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err)
          throw err
        }
        // Put our info into the annotation
        this.annotation = JSON.parse(data)
      })
    })
  }

}
