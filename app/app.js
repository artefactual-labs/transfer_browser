import angular from 'angular';
import 'angular-route';
import 'angular-route-segment';
import 'angular-tree-control';
import 'restangular';

export default angular.module('transferBrowse', [
  'ngRoute',
  'route-segment',
  'restangular',
  'treeControl',
]);
