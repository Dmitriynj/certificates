export const confirmModalComponent = {
  bindings: {
    showConfirmationModal: '<'
  },
  template: require('./confirm-modal.html'),
  controller: class ConfirmModalComponent {
    static $inject = [];
    constructor() {

    }

    $onInit() {
      this.showConfirmationModal = true;

    }

    $onChanges(changes) {
      if(changes.showConfirmationModal) {
        this.showConfirmationModal = angular.copy(this.showConfirmationModal);
      }
    }

    success() {

    }

    cancel() {

    }
    showDialog() {

    }
  }
};
