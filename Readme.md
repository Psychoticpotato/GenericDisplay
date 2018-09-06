# Generic Display

## General Info
This package is to allow for the easy creation of a GUI to modify any random object.
There are no dependencies, and you can use it in either web or with a desktop framework (electron/nwjs).

Your data should be loaded into a `DataDisplay` interface under, well, `data`.

## Important Members
### data object
`data` is an array of objects.  This is by design; the intent is to store multiple like items and allow the front-end to display each one in turn.
EX: Having multiple book information to display, but the same `annotation`.

### annotation object
`annotation` is an object which contains one or more `DisplayTab`
That's really its only purpose

### DisplayTab object
`DisplayTab` is an interface with the following members:
- \_\_name: string - Title to be displayed on the tab
- \_description: string - General info about this tab
- \_index: number - Display order for the tabs
- AAATopLevel: DisplaySection - Any entries not in sections go here
- Any values that do not start with an underscore are assumed to be DisplaySection.  If an entry is found

A `<div>` is generated for each tab, and they are for sorting somewhat related info together.

### DisplaySection object
`DisplaySection` is an interface that has various entries (or other DisplaySetions)
- \_legend: string - The title of this section (displayed in the border)
- \_description: string - General information about this section
- \_index: number - Display Order of the sections
- Any values that do not start with an underscore are assumed to be a DisplaySection or DisplayEntry

A `<fieldset>` is generated for each section.  Sections can be nested any number deep (until you crash your browser, I suppose).  They are for sorting closely related info together

### DisplayEntry Object
`DisplayEntry` is an interface for 'leaf' data; the actual primitive data stored in an object.
- \_index: string - Display order of entries
- **ANY** value beginning with `__` is assumed to be an html/css attribute (minus the underscores).  Some important ones:
  - \_\_title: string - the tooltip for the input
  - \_\_name: string - is the name (also used in a `<label>` tag beside the input)
  - \_\_id is the html ID.
    - **IMPORTANT**: It is advised to have the full 'dot-notation' path to your data entry here: `tab.section.section.entry` => `livingRoom.furniture.table.coffee`

#### Wait, we have to manually type this crap out?!
You absolutely don't have to manually map out all this fecal matter.

If `DataDisplay` doesn't have anything under `annotation`, a fallback is used: The first object under `data` will be used to generate the GUI, albeit with a basket of assumptions.  The process is as follows:
- Top level objects are taken as Tabs
- The key of each object is the tab name
- TODO: Top level primitives will be put in their own tab
- Children of Each Tab:
  - Top Level Objects are taken as sections
  - The `legend` is set to the object key
  - Children of each Section:
    - Sub Objects are taken as sections
    - Primitive values are taken as entries
    - Entries:
      - The `name` is set to the object key
      - The type is assumed based on the data type
        - Integer values are given a `step` of 1
        - Float values are given a `step` of 'any'

Some general notes on this method:
- The order of display depends on whatever black magic `for(const key in object)` uses.
- \_description is always set to 'DESCRIPTION NOT SET'
- \_tooltip is set to 'TOOLTIP NOT SET'
- TODO: In the future, ways to specify via GUI the title/name/tooltips will be available.
