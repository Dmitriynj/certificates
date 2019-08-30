export const certificateEditComponent = {
  bindings: {
    certificateId: '<',
  },
  template: require('./certificate-edit.html'),
  controller: class CertificateEditComponent {
    constructor(CertificateService, $stateParams, $state) {
      'ngInject';

      this.certificateService = CertificateService;
      this.certificateId = $stateParams.certificateId;
      this.$state = $state;
    }

    $onInit() {

    }

    updateCertificate(event) {
      let thisObj = this;
      this.certificateService.update(event.certificate).then((response) => {
        thisObj.$state.go('certificates');
      });
    }
  }
};
