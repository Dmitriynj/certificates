export const navComponent = {
  bindings: {
    user: '&',
    onLogout: '&'
  },
  template: require('./app-nav.html'),
  controller: class AppNavComponent {
    static $inject = ['$state', '$uibModal', 'AuthService', 'stateConst', 'componentConst'];

    constructor($state, $uibModal, AuthService, stateConst, componentConst) {

      this.$state = $state;
      this.$uibModal = $uibModal;
      this.authService = AuthService;
      this.stateConst = stateConst;
      this.componentConst = componentConst;
    }

    $onInit() {
      this.user = this.authService.getUser();
    }

    logout() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {
          bodyMessageKey: () => 'LEAVE_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
        this.authService.logout()
          .then(this.$state.go(this.stateConst.AUTH_LOGIN.name));
      }, error => {});
    }

    goToAddCertificate() {
      this.$state.go(this.stateConst.CERTIFICATE_ADD.name);
    }
  }
};
