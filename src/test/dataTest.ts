import * as data from '../general/dataDisplay'
import * as annotation from '../general/annotation'

/** First name of an individual */
const firstName: annotation.DisplayEntry = {
  _title: 'First Name',
  _dataType: 'string',
  _description: 'First name of a person',
  _index: 0,
}
/** Last name of an individual */
const lastName: annotation.DisplayEntry = {
  _title: 'Last Name',
  _dataType: 'string',
  _description: 'Last name of a person',
  _index: 1,
}
const nameSect: annotation.DisplaySection = {
  _title: 'Name',
  _index: 0,
  _description: 'Name of an individual',
  firstName,
  lastName,
}

const tab: annotation.DisplayTab = {
  _title: 'personalInfo',
  _description: 'Info about a person',
  _index: 0,
  nameSect,
}

interface DataInterface {
  firstName: string
  lastName: string
}
/** Mock data to use in the test */
const dataVals: DataInterface[] = [{
  firstName: 'David',
  lastName: 'Gilmour',
}, {
  firstName: 'John',
  lastName: 'Lennon',
}]

export const displayTest: data.DataDisplay = {
  data: dataVals,
  annotationPath: '',
  annotation: { tab },
}
