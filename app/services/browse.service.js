import angular from 'angular';
import Base64 from 'base64-helpers';
import 'lodash';
import 'restangular';

import {decode_browse_response, format_entries} from 'archivematica-browse-helpers';

class Browse {
  constructor(Restangular) {
    this.browser = Restangular.one('filesystem').one('children').one('location');
  }

  browse(location_uuid, path) {
    let params = {'path': Base64.encode(path)};
    return this.browser.one(location_uuid).get(params).then(decode_browse_response).then(response => {
      return format_entries(response, path);
    }).then(entries => {
      entries.forEach(entry => entry.location = location_uuid);
      return entries;
    });
  }
}

export default angular.module('services.browse', ['restangular']).
  service('Browse', Browse).
  name;

Browse.$inject = ['Restangular'];
