export const addCertificateComponent = {
  bindings: {
  },
  template: require('./certificate-add.html'),
  controller: class AddCertificateComponent {
    static $inject = ['$state', 'CertificateService'];

    constructor($state, CertificateService) {
      this.certificateService = CertificateService;
      this.$state = $state;
    }

    $onInit() {
    }

    addCertificate(event) {
      this.certificateService.create(event.certificate).then(() => {
        this.$state.go('certificates');
      });
    }
  }
};
