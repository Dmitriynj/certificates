export const certificateEditComponent = {
  bindings: {
    certificate: '<',
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

    $onInit() {
    }

    async updateCertificate(event) {
      await this.certificateService.update(event.certificate);
      this.$state.go(this.stateConst.CERTIFICATES.name);
    }
  }
};
