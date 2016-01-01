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
    this.path = '';
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
      'paths[]': [this.path],
      // TODO: implement row UUID feature
      'row_ids[]': [''],
    };

    // Cleanup object state on success or failure
    return $.post('/filesystem/transfer/', params).then(cleanup, cleanup);
  }
}

export default angular.module('services.transfer', []).
  service('Transfer', Transfer).
  name;
