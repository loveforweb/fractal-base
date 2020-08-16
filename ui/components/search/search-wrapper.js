/**
 * COMPONENT - Example 1.0
 * @module Example
 */
'use strict';

export class SearchComponent {
  /**
   * Constructor
   * @param {object} element - Element associated with the module
   * @param {object} options - options for the module
   */
  constructor(element, options) {
    this.root = element;
    this.relatedPanel = this.root.getAttribute('data-panel');
    this.panel = document.querySelector(`.${this.relatedPanel}`);
    this.panelCloseBtn = this.panel
      ? this.panel.querySelector('.close-btn')
      : false;
    this.showClass = 'show';

    if (!this.panel) {
      console.error(
        `COMPONENT ERROR: Element "${this.relatedPanel}" is not present on the page`
      );

      return;
    }

    this.applyListeners();
  }

  displayPanel() {
    this.panel.classList.toggle(this.showClass);
  }

  applyListeners() {
    this.root.addEventListener('click', this.displayPanel.bind(this));
    this.panelCloseBtn.addEventListener('click', this.displayPanel.bind(this));
  }
}

const Component = {
  elements: [],
  objects: [],
  init: (className, options = {}) => {
    let i;
    Component.elements = document.querySelectorAll(className);
    for (i = 0; i < Component.elements.length; i += 1) {
      Component.objects.push(
        new SearchComponent(Component.elements[i], Object.assign({}, options))
      );
    }
  },
};

export default Component;
