'use strict'

class Component extends HTMLElement {
  static define (component, target, attributes = {}) {
    const tagName = this.getTagName(component)

    customElements.define(tagName, component)

    if (target !== undefined) {
      let instance = new component(attributes)

      target.appendChild(instance)

      return instance
    }

    return document.querySelector(tagName)
  }

  static getTagName (component) {
    return component.name.split(/(?=[A-Z])/g).map((value) => {
      return value.charAt(0).toLowerCase() + value.substring(1)
    }).join('-')
  }

  constructor (attributes) {
    super()

    this.state = {}

    if (this.attributes.length > 0) {
      // Map attributes to state
      for (let attribute of this.attributes) {
        this.state[attribute.name] = attribute.value
      }
    } else {
      this.state = attributes
    }

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.innerHTML = this.render()
  }

  onEvent (type, target,  handler) {
    this.addEventListener(type, (event) => {
      // if(event.path[0] === target) {
      // if(target.isEqualNode(event.path[0]) ||
      //   target.isEqualNode(event.path[0].parentNode)
      // ) {
      if (event.path[0].matches(target)) {
        handler(event)
      }
    })
  }

  removeEvent (type, handler) {
    this.removeEventListener(type, handler)
  }

  connectedCallback () {
    console.log('connectedCallback()')
  }

  setState (state) {
    for (let key in state) {
      this.state[key] = state[key]

      this.setAttribute(key, state[key])
    }

    this.shadowRoot.innerHTML = this.render()
  }
}
