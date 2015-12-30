import angular from 'angular';

class BrowseController {
  constructor(Browse, SourceLocations) {
    let vm = this;

    vm.browser = Browse;
    vm.source_location_browser = SourceLocations;
    vm.source_locations = {};
    vm.fetch_source_locations();

    vm.options = {
      dirSelectable: true,
      isLeaf: function(node) {
        return !node.has_children;
      },
    };

    vm.data = [];
    vm.selected = [];
  }

  browse(location_uuid) {
    let path = this.source_locations[location_uuid].description;
    this.browser.browse(location_uuid, path).then(data => {
      this.data = data;
    });
  }

  fetch_source_locations() {
    let previous_locations = this.source_locations;
    this.source_locations = {};

    this.source_location_browser.list().then(locations => {
      locations.forEach(location => {
        this.source_locations[location.uuid] = location;
      });
      // preselect the first location, and browse it's contents
      this.source_location = locations[0].uuid;
      this.browse(this.source_location);
    }, error => {
      this.source_locations = previous_locations;
    });
  }

  on_toggle(node, expanded) {
    if (!expanded || node.children_fetched) {
      return;
    }

    let path = node.path;
    this.browser.browse(this.source_location, path).then(entries => {
      node.children = entries;
      node.children_fetched = true;
    });
  }
}

export default angular.module('controllers.browse', ['services.browse', 'services.source_locations']).
  controller('BrowseController', BrowseController).
  name;

BrowseController.$inject = ['Browse', 'SourceLocations'];