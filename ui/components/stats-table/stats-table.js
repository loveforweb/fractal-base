// import Tablesort from 'tablesort';
import $ from 'jquery';
import DataTables from 'datatables.net-dt';
/**
 * COMPONENT - StatsTable 1.0
 * @module StatsTable
 */
('use strict');

export class StatsTable {
  /**
   * Constructor
   * @param {object} element - Element associated with the module
   * @param {object} options - options for the module
   */
  constructor(element, options) {
    this.root = element;
    $(`#${this.root.id}`).DataTable();
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
        new StatsTable(Component.elements[i], Object.assign({}, options))
      );
    }
  },
};

export default Component;
