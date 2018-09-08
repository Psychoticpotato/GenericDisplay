import * as data from '../general/dataDisplay.js'
import * as annotation from '../general/annotation.js'
import { generateTabs } from '../display/generateTabs.js'
import { randomReady } from './dataTestRandom.js'
/** First name of an individual */
const firstName: annotation.DisplayEntry = {
  __name: 'First Name',
  __type: 'text',
  __title: 'First name of a person',
  __id: 'name.last',
  __class: 'display-entry',
  _index: 0,
}
/** Last name of an individual */
const lastName: annotation.DisplayEntry = {
  __name: 'First Name',
  __type: 'text',
  __title: 'Last name of a person',
  __id: 'name.first',
  __class: 'display-entry',
  _index: 1,
}
const nameSect: annotation.DisplaySection = {
  __id: 'personalInfo.name',
  _legend: 'Name Information',
  _index: 0,
  _description: 'Name of an individual',
  __class: 'display-section',
  firstName,
  lastName,
}

const tab: annotation.DisplayTab = {
  __name: 'personalInfo',
  _description: 'Info about a person',
  _index: 0,
  __id: 'personalInfo',
  __class: 'display-tab',
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
  data: [randomReady],
  annotationPath: '',
  annotation: {},
}

const tabs = generateTabs(displayTest)
console.log(tabs)
const body = document.getElementById('body')
// Append to the body
if (body) {
  tabs.forEach((curTab) => {
    body.appendChild(curTab)
  })
}
