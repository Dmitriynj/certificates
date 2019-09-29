export const addCertificateComponent = {
  bindings: {
  },
  template: require('./certificate-add.html'),
  controller: class AddCertificateComponent {
    static $inject = ['$state', 'CertificateService', 'stateConst'];

    constructor($state, CertificateService, stateConst) {
      this.certificateService = CertificateService;
      this.$state = $state;
      this.stateConst = stateConst;
    }

    $onInit() {
    }

    addCertificate(event) {
      this.certificateService.create(event.certificate).then(() => {
        this.$state.go(this.stateConst.CERTIFICATES.name);
      });
    }
  }
};
