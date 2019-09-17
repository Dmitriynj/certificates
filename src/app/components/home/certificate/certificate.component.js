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
    static $inject = ['UserService', '$state', '$uibModal', 'CertificateService'];

    constructor(UserService, $state, $uibModal, CertificateService) {

      this.$state = $state;
      this.$uibModal = $uibModal;
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

    updateTags(event) {
      this.certificate.tags = event.tags;
      this.certificateService.update(this.certificate);
    }

    edit() {
      this.$state.go(
        'certificate-edit',
        {certificateId: this.certificate.id});
    }

    buy() {
      this.$uibModal.open({
        animation: true,
        component: 'confirmModalComponent',
        resolve: {
          bodyMessageKey: () => 'BUY_CONFIRM_MESSAGE'
        },
      }).result.then(result => {
        if (!this.user.certificates) {
          this.user.certificates = [];
        }
        this.user.certificates.push(this.certificate);
        this.userService.update(this.user).then((response) => {
          this.user = response;
          this.isUserHaveThisCertificate = true;
        });
      }, reason => {});
    }

    cell() {
      this.$uibModal.open({
        animate: true,
        component: 'confirmModalComponent',
        resolve: {
          bodyMessageKey: () => 'CELL_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
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
      }, reason => {});
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
      this.$uibModal.open({
        animate: true,
        component: 'confirmModalComponent',
        resolve: {
          bodyMessageKey: () => 'DELETE_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
        this.certificateService.delete(this.certificate.id).then(() => {
          this.onDelete();
        });
      }, reason => {});
    }
  }
};
