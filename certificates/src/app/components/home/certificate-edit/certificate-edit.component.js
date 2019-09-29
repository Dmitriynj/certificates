export const certificateEditComponent = {
  bindings: {
    certificateId: '<',
  },
  template: require('./certificate-edit.html'),
  controller: class CertificateEditComponent {
    static $inject = ['CertificateService', '$stateParams', '$state', 'stateConst'];

    constructor(CertificateService, $stateParams, $state, stateConst) {

      this.certificateService = CertificateService;
      this.certificateId = $stateParams.certificateId;
      this.$state = $state;
      this.stateConst = stateConst;
    }

    updateCertificate(event) {
      this.certificateService.update(event.certificate).then((response) => {
        this.$state.go(this.stateConst.CERTIFICATES.name);
      });
    }
  }
};
