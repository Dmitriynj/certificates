export const certificateEditFormComponent = {
  bindings: {
    certificateId: '<',
    newCertificate: '<',
    buttonName: '<',
    onSubmit: '&',
  },
  template: require('./certificate-edit-from.html'),
  controller: class CertificateComponent {
    static $inject = ['CertificateService', '$stateParams'];

    constructor(CertificateService, $stateParams) {

      this.certificateService = CertificateService;
      this.$stateParams = $stateParams;
    }


    $onInit() {
      this.titleMaxlength = 30;
      this.descriptionMaxLength = 1000;
      this.costRegex = '^(0*[1-9][0-9]*(\\.[0-9]+)?|0+\\.[0-9]*[1-9][0-9]*)$';

      let $ctrl = this;
      this.certificateService.getById(this.$stateParams.certificateId)
        .then((response) => {
          $ctrl.certificate = response;
          this.newCertificate = {
            certificateCost: response.cost,
            certificateDescription: response.description,
            certificateTitle: response.title,
          };
        });
    }

    addTag() {
      this.certificate.tags.push({
        id: this.certificate.tags.length + 1,
        name: this.tagName
      })
    }

    deleteTag(tag) {
      let tagNames = this.certificate.tags.map((tag) => tag.name);
      let index = tagNames.indexOf(tag.name);
      if (index > -1) {
        this.certificate.tags.splice(index, 1);
      }
    }

    submitForm() {
      this.certificate.title = this.newCertificate.certificateTitle;
      this.certificate.description = this.newCertificate.certificateDescription;
      this.certificate.cost = this.newCertificate.certificateCost;

      this.onSubmit({
        $event: {
          certificate: this.certificate
        },
      });
    }
  }
};
