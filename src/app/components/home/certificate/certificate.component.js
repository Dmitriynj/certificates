export const certificateComponent = {
  bindings: {
    certificate: '<',
    onAddTag: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['$state', 'AuthService', 'UserService'];

    constructor($state, AuthService, UserService) {

      this.$state = $state;
      this.authService = AuthService;
      this.userService = UserService;
    }

    $onInit() {
      this.user = this.authService.getUser();
      this.isUserHaveThisCertificate = this.isUserHaveThisCertificate();
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
      if (!this.user.certificates) {
        this.user.certificates = [];
      }
      this.user.certificates.push(this.certificate);
      this.userService.update(this.user).then((response) => {
        this.user = response;
        this.isUserHaveThisCertificate = true;
      });
    }

    cell() {
      for (let i = 0; i < this.user.certificates.length; i++) {
        if (this.user.certificates[i].id === this.certificate.id) {
          this.user.certificates.splice(i, 1);
          this.userService.update(this.user).then((response) => {
            this.user = response;
            this.isUserHaveThisCertificate = false;
          });
        }
      }
    }

    isUserHaveThisCertificate() {
      if (!!this.user.certificates) {
        for (let i = 0; i < this.user.certificates.length; i++) {
          if (this.user.certificates[i].id === this.certificate.id) {
            return true;
          }
        }
      }
      return false;
    }


  }
};
