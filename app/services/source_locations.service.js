import angular from 'angular';
import 'lodash';
import 'restangular';

class SourceLocations {
  constructor(Restangular) {
    this.locations = Restangular.one('transfer').one('locations');
  }

  list() {
    return this.locations.getList();
  }
}

export default angular.module('services.source_locations', ['restangular']).
  service('SourceLocations', SourceLocations).
  name;

SourceLocations.$inject = ['Restangular'];
