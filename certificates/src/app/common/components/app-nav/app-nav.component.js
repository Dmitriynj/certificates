export const navComponent = {
  bindings: {
    user: '&',
    onLogout: '&'
  },
  template: require('./app-nav.html'),
  controller: class AppNavComponent {
    static $inject = ['AuthService', '$state', '$uibModal'];

    constructor(AuthService, $state, $uibModal) {

      this.authService = AuthService;
      this.$state = $state;
      this.$uibModal = $uibModal;
    }

    $onInit() {
      // this.authService.getUser().then((response) => {
      //   this.user = response;
      // });
    }

    logout() {
      this.$uibModal.open({
        component: 'confirmModalComponent',
        resolve: {
          bodyMessageKey: () => 'LEAVE_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
        this.authService.newLogout();
        this.$state.go('auth.login');
      }, reason => {
      });
    }

    goToAddCertificate() {
      this.$state.go('certificate-add');
    }
  }
};
