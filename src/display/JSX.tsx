/*
 * This file deals with generation of html elements
 * These should not have to be used directly if using JSX
 */

export function generateElement(tag: string, attrs: any, ...children: any[]): HTMLElement {
  /** The element to return */
  const elem = document.createElement(tag)
  // Loop through each key in the attributes
  // console.log(elem.tagName)
  for (const key in attrs) {
    if (attrs.hasOwnProperty(key)) {
      elem.setAttribute(key, attrs[key])
    }
  }
  // If children objects have been provided, append them
  if (children) {
    children.forEach((child) => {
      generateChild(child, elem)
    })
  }

  // And return the completed element
  return elem
}

function generateChild(input: any, parent: HTMLElement) {
  // Check the type of the input
  if (Array.isArray(input)) {
    input.forEach((item) => {
      if (item instanceof HTMLElement) {
        parent.appendChild(item)
      } else {
        const node = document.createTextNode(item)
        parent.appendChild(node)
      }
    })
  } else {
    if (input instanceof HTMLElement) {
      parent.appendChild(input)
    } else {
      const node = document.createTextNode(input)
      parent.appendChild(node)
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      image: any,
      div: any,
      p: any,
      button: any,
      input: any,
      label: any,
      fieldset: any,
      br: any,
      legend: any,
    }
  }
}
