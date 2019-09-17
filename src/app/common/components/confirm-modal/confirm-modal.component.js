export const confirmModalComponent = {
  bindings: {
    resolve: '<',
    modalInstance: '<'
  },
  template: require('./confirm-modal.html'),
  controller: class ConfirmModalComponent {

    $onInit() {
      this.bodyMessageKey = this.resolve.bodyMessageKey;
    }

    ok() {
      this.modalInstance.close('success');
    };

    cancel() {
      this.modalInstance.dismiss('cancel');
    };
  }
};
