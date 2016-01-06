import angular from 'angular';

import '../services/transfer.service';

class HeaderController {
  constructor(Transfer) {
    this.transfer = Transfer;
  }

  remove_component(component) {
    if (confirm(`Are you sure you want to remove this transfer component (${component.path})?`)) {
      this.transfer.components.pop(component);
    }
  }
}

export default angular.module('controllers.header', ['services.transfer']).
  controller('HeaderController', HeaderController).
  name;

HeaderController.$inject = ['Transfer'];
