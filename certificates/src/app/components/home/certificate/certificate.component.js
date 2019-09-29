export const certificateComponent = {
  bindings: {
    isBoughtCertificate: '<',
    certificate: '<',
    onAddTag: '&',
    onCellCertificate: '&',
    onDelete: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['$state', '$uibModal', '$rootScope', 'CertificateService', 'stateConst', 'componentConst'];

    constructor($state, $uibModal, $rootScope, CertificateService, stateConst, componentConst) {

      this.$state = $state;
      this.$uibModal = $uibModal;
      this.$rootScope = $rootScope;
      this.certificateService = CertificateService;
      this.stateConst = stateConst;
      this.componentConst = componentConst;
    }

    $onInit() {
      this.user = this.$rootScope.user;
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
      this.$state.go(
        this.stateConst.CERTIFICATE_EDIT.name,
        {certificateId: this.certificate._id});
    }

    buy() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {
          bodyMessageKey: () => 'BUY_CONFIRM_MESSAGE'
        },
      }).result.then(async result => {

        const response = await this.certificateService.buyCertificate(this.certificate);
        this.isBoughtCertificate = true;

      }, reason => {});
    }

    cell() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {
          bodyMessageKey: () => 'CELL_CONFIRM_MESSAGE'
        }
      }).result.then(result => {



      }, reason => {});
    }

    delete() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {
          bodyMessageKey: () => 'DELETE_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
        this.certificateService.delete(this.certificate.id).then(() => {
          this.onDelete();
        });
      }, reason => {});
    }
  }
};
