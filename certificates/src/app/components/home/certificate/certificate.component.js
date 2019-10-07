export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&',
    onCertificateChange: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['$state', '$uibModal', 'AuthService', 'CertificateService', 'stateConst', 'componentConst'];

    constructor($state, $uibModal, AuthService, CertificateService, stateConst, componentConst) {

      this.$state = $state;
      this.$uibModal = $uibModal;
      this.authService = AuthService;
      this.certificateService = CertificateService;
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

    async updateTags(event) {
      this.certificate.tags = event.tags;
      this.certificate = await this.certificateService.updateCertificate(this.certificate);
      console.log(this.certificate);
    }

    edit() {
      this.$state.go(this.stateConst.CERTIFICATE_EDIT.name, {certificateId: this.certificate._id});
    }

    buy() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'BUY_CONFIRM_MESSAGE'},
      }).result.then(async result => {
        await this.certificateService.buyCertificate(this.certificate._id);
        this.onCertificateChange();
      }, error => {
      });
    }

    cell() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'CELL_CONFIRM_MESSAGE'}
      }).result.then(async result => {
        await this.certificateService.cellCertificate(this.certificate._id);
        this.onCertificateChange();
      }, error => {
      });
    }

    delete() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {bodyMessageKey: () => 'DELETE_CONFIRM_MESSAGE'}
      }).result.then(async result => {
        await this.certificateService.delete(this.certificate._id);
        this.onCertificateChange();
      }, error => {
      });
    }
  }
};
