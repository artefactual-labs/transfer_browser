import angular from 'angular';
// TODO rework the API in a way that's easier to use with Restangular?
// The original API requires its body formatted in a way that
// Restangular is not very good at.
import $ from 'jquery';

class Transfer {
  constructor() {
    this.name = '';
    this.type = 'standard';
    this.accession = '';
    this.components = [];
  }

  add_component(entry) {
    // Copy the component so we're not mutating the object from the tree
    let component = Object.assign({}, entry);
    // If an ID for the next row has been provided, use it now
    if (this.next_id) {
      component.id = this.next_id;
      delete this.next_id;
    }
    this.components.push(component);
  }

  fetch_id_for(component) {
    return $.get('/transfer/create_metadata_set_uuid/').then(results => {
      component.id = result.uuid;
    });
  }

  start() {
    let cleanup = response => {
      this.name = '';
      this.type = 'standard';
      this.accession = '';
      this.path = '';
    };

    let params = {
      name: this.name,
      type: this.type,
      accession: this.accession,
      'paths[]': this.components.map(component => Base64.encode(`${component.location}:${component.path}`)),
      'row_ids[]': this.components.map(component => component.id || ''),
    };

    // Cleanup object state on success or failure
    return $.post('/filesystem/transfer/', params).then(cleanup, cleanup);
  }
}

export default angular.module('services.transfer', []).
  service('Transfer', Transfer).
  name;
