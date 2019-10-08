export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&',
    onBuyCertificate: '&',
    onCellCertificate: '&',
    onDeleteCertificate: '&'
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['$state', '$uibModal', 'AuthService', 'CertificateService', 'OrderService', 'stateConst', 'componentConst'];

    constructor($state, $uibModal, AuthService, CertificateService, OrderService, stateConst, componentConst) {

      this.$state = $state;
      this.$uibModal = $uibModal;
      this.authService = AuthService;
      this.certificateService = CertificateService;
      this.orderService = OrderService;
      this.stateConst = stateConst;
      this.componentConst = componentConst;
    }

    $onInit() {
      this.user = this.authService.getUser();
    }

    $onChanges(changes) {
      if (changes.certificate) {
        this.certificate = angular.copy(this.certificate);
      }
    }

    addTag(event) {
      this.onAddTag({
        $event: {
          tag: event.tag,
        }
      });
    }

    async onUpdateTags(event) {
      this.certificate.tags = event.tags;
      try{
        await this.certificateService.update(this.certificate);
      } catch(error) { }
    }

    edit() {
      this.$state.go(this.stateConst.CERTIFICATE_EDIT.name, {certificateId: this.certificate._id});
    }

    buy() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'BUY_CONFIRM_MESSAGE'},
      }).result.then(async result => {
        try {
          await this.orderService.buyCertificate(this.certificate._id);
          this.certificate.isOwned = true;
          this.onBuyCertificate({
            $event: {
              _id: this.certificate._id
            }
          });
        } catch(error) {}
      }, error => {
      });
    }

    cell() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'CELL_CONFIRM_MESSAGE'}
      }).result.then(async result => {
        try {
          this.orderService.cellCertificate(this.certificate._id);
          this.certificate.isOwned = false;
          this.onCellCertificate({
            $event: {
                _id: this.certificate._id
            }
          });
        } catch(error) { }
      }, error => {
      });
    }

    delete() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'DELETE_CONFIRM_MESSAGE'}
      }).result.then(async result => {
        this.certificateService.delete(this.certificate._id)
          .then(this.onDeleteCertificate)
          .catch(error => {});
      }, error => {
      });
    }
  }
};
