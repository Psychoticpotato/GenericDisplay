// import { DisplayEntry } from '../general/annotation'

/**
 * Appends the specified value to the attributes
 * A check is performed to see if `val` exists
 * @param  {[object]} attrs Attributes to mutate
 * @param  {[string]} val   Value to add to the classes
 */
export function appendToClass(attrs: any, val: string) {
  /** The class string */
  const classStr: string = attrs.class
  // If we already have class, check if we have the 'val' on it
  if (classStr) {
    /** All classes split into individual strings */
    const classes = classStr.split(' ')
    // Loop for each class
    classes.forEach((curClass) => {
      // If we already have this value, escape
      if (curClass === val) {
        return
      }
    })
    // Append the value to the class (with a space)
    attrs.class += ` ${val}`
  } else {
    // If we don't have any class, make some
    attrs.class = val
  }
}
/**
 * Adds the item to the specified array and returns the updated offset
 * @param {[type]} array  Array to modify
 * @param {[type]} item   Item to add
 * @param {[type]} index  Index at which to insert
 * @param {[type]} offset Offset (in the event of identical indexes)
 */
export function addToArray(array: any[], item: any, index: number, offset: number): number {
  // Push the item to the array in order
  // Check if we have something at that index
  if (array[index]) {
    array.splice(index + offset, 0, item)
    // Increment the offset; this will be used every time we insert
    offset++
  } else {
    array[index + offset] = item
  }
  // Return the modified offset
  return offset
}
