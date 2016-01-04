import angular from 'angular';

import '../services/transfer.service';

class HeaderController {
  constructor(Transfer) {
    this.transfer = Transfer;
  }
}

export default angular.module('controllers.header', ['services.transfer']).
  controller('HeaderController', HeaderController).
  name;

HeaderController.$inject = ['Transfer'];
