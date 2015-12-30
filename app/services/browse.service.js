import angular from 'angular';
import 'lodash';
import 'restangular';

import {decode_browse_response, format_entries} from '../helpers/browse_helpers';

class Browse {
  constructor(Restangular) {
    this.browser = Restangular.one('filesystem').one('children').one('location');
  }

  browse(location_uuid, path) {
    let params = {'path': Base64.encode(path)};
    return this.browser.one(location_uuid).get(params).then(decode_browse_response).then(response => {
      return format_entries(response, path);
    });
  }
}

export default angular.module('services.browse', ['restangular']).
  service('Browse', Browse).
  name;

Browse.$inject = ['Restangular'];
