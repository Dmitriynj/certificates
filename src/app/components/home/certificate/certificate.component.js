export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    constructor($state, AuthService) {
      'ngInject';

      this.$state = $state;
      this.authService = AuthService;
    }

    $onInit() {
      this.user = this.authService.getUser();
    }

    addTag(event) {
      this.onAddTag({
        $event: {
          tag: event.tag,
        }
      });
    }

    edit() {
      this.$state.go(
        'certificate-edit',
        {certificateId: this.certificate.id});
    }

  }
};
