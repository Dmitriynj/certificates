export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&'
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    constructor() {
      'ngInject';
    }

    $onInit() {

    }

    addTag(event) {
      this.onAddTag({
        $event: {
          tag: event.tag,
        }
      });
    }

  }
};
