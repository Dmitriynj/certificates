export const certificateComponent = {
  bindings: {
    user: '<',
    certificate: '<',
    onAddTag: '&',
    onCellCertificate: '&',
    onDelete: '&',
  },
  template: require('./certificate.html'),
  controller: class CertificateComponent {
    static $inject = ['UserService', '$state', 'CertificateService'];

    constructor(UserService, $state, CertificateService) {

      this.$state = $state;
      this.userService = UserService;
      this.certificateService = CertificateService;
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
      });
    }

    cell() {
      this.user.certificates.forEach((certificate, index) => {
        if (certificate.id === this.certificate.id) {
          this.user.certificates.splice(index, 1);
          this.userService.update(this.user).then((response) => {
            this.user = response;
            this.isUserHaveThisCertificate = false;
            this.onCellCertificate();
          });
        }
      });
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
      this.certificateService.delete(this.certificate.id).then(() => {
        this.onDelete();
      });
    }

  }
};
