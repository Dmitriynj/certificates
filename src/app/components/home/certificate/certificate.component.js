export const certificateComponent = {
  bindings: {
    user: '<',
    certificate: '<',
    onAddTag: '&',
    onChangeUserCertificate: '&',
    onDelete: '&'
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['UserService', '$state', 'CertificateService'];

    constructor(UserService, $state, CertificateService) {

      this.$state = $state;
      this.userService = UserService;
      this.certificateCervice = CertificateService;
    }

    $onInit() {
      this.isUserHaveThisCertificate = this.isUserHaveThisCertificateFun();
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
        this.onChangeUserCertificate();
      });
    }

    cell() {
      for (let i = 0; i < this.user.certificates.length; i++) {
        if (this.user.certificates[i].id === this.certificate.id) {
          this.user.certificates.splice(i, 1);
          this.userService.update(this.user).then((response) => {
            this.user = response;
            this.isUserHaveThisCertificate = false;
            this.onChangeUserCertificate();
          });
        }
      }
    }

    isUserHaveThisCertificateFun() {
      if (!!this.user.certificates) {
        for (let i = 0; i < this.user.certificates.length; i++) {
          if (this.user.certificates[i].id === this.certificate.id) {
            return true;
          }
        }
      }
      return false;
    }

    delete() {
      this.certificateCervice.delete(this.certificate.id).then(() => {
        this.onDelete();
      });
      // this.user.password = '';
      // this.onDelete();
      // this.certificateCervice.delete(this.certificate.id).then((response) => {
      //   if (this.isUserHaveThisCertificate) {
      //     this.user.certificates.filter((certificate) => {
      //       return certificate.id !== this.certificate.id;
      //     });
      //     // this.userService.update(this.user).then((response) => {
      //     //   this.user = response;
      //     // });
      //     this.user = {};
      //   }
      //   this.onDelete();
      // });

    }

  }
};
