// styles
import './css/browser.css';
import 'angular-tree-control/css/tree-control.css';
import 'angular-tree-control/css/tree-control-attribute.css';
// import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import 'angular-route';
import 'angular-route-segment';
import 'angular-tree-control';
// FIXME: doing this clashes with the dashboard's global bootstrap;
//        we should find a better fix for this at some point.
// import 'bootstrap';
import 'restangular';

// services
import './services/browse.service';
import './services/source_locations.service';
import './services/transfer.service';

// controllers
import './browse/browse.controller';
import './header/header.controller';

export default angular.module('transferBrowse', [
  'ngRoute',
  'route-segment',
  'restangular',
  'treeControl',
  'services.browse',
  'services.source_locations',
  'services.transfer',
  'controllers.browse',
  'controllers.header',
]).

config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setRequestSuffix('/');
}]);
