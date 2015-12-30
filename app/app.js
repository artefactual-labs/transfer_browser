import angular from 'angular';
import 'angular-route';
import 'angular-route-segment';
import 'angular-tree-control';
import 'restangular';

// services
import './services/source_locations.service';

export default angular.module('transferBrowse', [
  'ngRoute',
  'route-segment',
  'restangular',
  'treeControl',
  'services.source_locations',
]).

config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setRequestSuffix('/');
}]);
