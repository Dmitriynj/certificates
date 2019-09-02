export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    constructor($state, AuthService, UserService) {
      'ngInject';

      this.$state = $state;
      this.authService = AuthService;
      this.userService = UserService;
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

    buy() {
      let user = this.authService.getUser();

      this.userService.update()
    }

  }
};
