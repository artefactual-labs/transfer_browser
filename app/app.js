import angular from 'angular';
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
