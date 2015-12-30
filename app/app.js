// styles
import 'angular-tree-control/css/tree-control.css';
import 'angular-tree-control/css/tree-control-attribute.css';

import angular from 'angular';
import 'angular-route';
import 'angular-route-segment';
import 'angular-tree-control';
import 'restangular';

// services
import './services/browse.service';
import './services/source_locations.service';

// controllers
import './browse/browse.controller';

export default angular.module('transferBrowse', [
  'ngRoute',
  'route-segment',
  'restangular',
  'treeControl',
  'services.browse',
  'services.source_locations',
  'controllers.browse',
]).

config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setRequestSuffix('/');
}]);
