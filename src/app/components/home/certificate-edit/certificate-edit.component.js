export const certificateEditComponent = {
  bindings: {
    certificateId: '<',
  },
  template: require('./certificate-edit.html'),
  controller: class CertificateEditComponent {
    static $inject = ['CertificateService', '$stateParams', '$state'];

    constructor(CertificateService, $stateParams, $state) {

      this.certificateService = CertificateService;
      this.certificateId = $stateParams.certificateId;
      this.$state = $state;
    }

    $onInit() {
    }

    updateCertificate(event) {
      this.certificateService.update(event.certificate).then((response) => {
        this.$state.go('certificates');
      });
    }
  }
};
