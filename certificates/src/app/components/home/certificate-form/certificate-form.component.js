export const certificateFormComponent = {
  bindings: {
    certificate: '<',
    buttonName: '<',
    actionName: '<',
    onSubmit: '&',
  },
  template: require('./certificate-from.html'),
  controller: class CertificateComponent {
    static $inject = ['CertificateService', '$stateParams', '$state', 'stateConst'];

    constructor(CertificateService, $stateParams, $state, stateConst) {

      this.certificateService = CertificateService;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.stateConst = stateConst;
    }

    $onInit() {

          this.titleFieldModel = {
            fieldNameKey: 'TITLE',
            fieldType: 'text',
            fieldValue: this.certificate.title,
            required: true,
            maxlength: 30,
            haveCustomFun: false,
          };
          this.dateFieldModel = {
            fieldNameKey: 'DATE',
            fieldType: '',
            fieldValue: this.certificate.date,
            required: true,
            pattern: '([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))',
            haveCustomFun: false,
          };
          this.descriptionFieldModel = {
            fieldNameKey: 'DESCRIPTION',
            fieldType: 'text',
            fieldValue: this.certificate.description,
            maxlength: 1000,
            required: true,
            haveCustomFun: false,
          };
          this.costFieldModel = {
            fieldNameKey: 'COST',
            fieldType: 'number',
            fieldValue: this.certificate.cost,
            required: true,
            pattern: '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$',
            haveCustomFun: false,
          };
    }

    addTag() {
      this.certificate.tags.push({
        id: this.certificate.tags.length + 1,
        name: this.tagName
      });
    }

    deleteTag(tag) {
      let tagNames = this.certificate.tags.map((tag) => tag.name);
      let index = tagNames.indexOf(tag.name);
      if (index > -1) {
        this.certificate.tags.splice(index, 1);
      }
    }

    submitForm() {
      this.onSubmit({
        $event: {
          certificate: this.certificate
        },
      });
    }

    cancel() {
      this.$state.go(this.stateConst.CERTIFICATES.name);
    }

    updateTitle(event) {
      this.certificate.title = event.value;
    }
    updateDate(event) {
      this.certificate.date = event.value;
    }
    updateDescription(event) {
      this.certificate.description = event.value;
    }
    updateCost(event) {
      this.certificate.cost = event.value;
    }
  }
};
