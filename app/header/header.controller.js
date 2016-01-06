import angular from 'angular';

import '../services/transfer.service';

class HeaderController {
  constructor(Transfer) {
    this.transfer = Transfer;
  }

  add_next_metadata() {
    let element = {};
    this.transfer.fetch_id_for(element).then(() => {
      this.transfer.next_id = element.id;
      window.open(`/transfer/component/${element.id}`, '_blank');
    });
  }

  open_edit_page(component) {
    let open_window = () => {
      window.open(`/transfer/component/${component.id}`, '_blank');
    };
    if (!component.id) {
      this.transfer.fetch_id_for(component).then(open_window);
    } else {
      open_window();
    }
  }

  remove_component(component) {
    if (confirm(`Are you sure you want to remove this transfer component (${component.path})?`)) {
      this.transfer.components.pop(component);
    }
  }
}

export default angular.module('controllers.header', ['services.transfer']).
  controller('HeaderController', HeaderController).
  name;

HeaderController.$inject = ['Transfer'];
