import angular from 'angular';
// TODO rework the API in a way that's easier to use with Restangular?
// The original API requires its body formatted in a way that
// Restangular is not very good at.
import $ from 'jquery';

class Transfer {
  constructor() {
    this.empty_properties();
  }

  empty_properties() {
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
    // If this is a zipped bag, then there will be no transfer name;
    // give it a dummy name instead.
    let name = this.type === 'zipped bag' ? 'ZippedBag' : this.name;

    let params = {
      name: name,
      type: this.type,
      accession: this.accession,
      'paths[]': this.components.map(component => Base64.encode(`${component.location}:${component.path}`)),
      'row_ids[]': this.components.map(component => component.id || ''),
    };

    // Cleanup object state on success or failure
    let promise = $.post('/filesystem/transfer/', params);
    this.empty_properties();
    return promise;
  }
}

export default angular.module('services.transfer', []).
  service('Transfer', Transfer).
  name;
