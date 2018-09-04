
/** Possible datatypes to be stored. */
export type DataType = 'checkbox' | 'number' | 'radio' | 'text' // | 'array'

/**
 * The possible inputs to be used
 */
export const InputTypes = [
  //  'button',
  'checkbox',
  //  'color',
  //  'date',
  //  'datetime-local',
  //  'email',
  //  'file',
  //  'hidden',
  //  'image',
  //  'month',
  'number',
  //  'password',
  'radio',
  //  'range',
  //  'reset',
  //  'search',
  //  'submit',
  //  'tel',
  'text',
  //  'time',
  //  'url',
  //  'week',
]

export function getType(input: any): DataType {
  switch (true) {
    case (typeof input === 'boolean'):
      return 'checkbox'
    case (!isNaN(Number(input))):
      return 'number'
    default:
      // Always default to text if nothing is found
      return 'text'
  }
}
