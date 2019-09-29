export const navComponent = {
  bindings: {
    user: '&',
    onLogout: '&'
  },
  template: require('./app-nav.html'),
  controller: class AppNavComponent {
    static $inject = ['AuthService', '$state', '$uibModal', '$rootScope', 'stateConst', 'componentConst'];

    constructor(AuthService, $state, $uibModal, $rootScope, stateConst, componentConst) {

      this.authService = AuthService;
      this.$state = $state;
      this.$uibModal = $uibModal;
      this.$rootScope = $rootScope;
      this.stateConst = stateConst;
      this.componentConst = componentConst;
    }

    $onInit() {
    }

    logout() {
      this.$uibModal.open({
        component: this.componentConst.CONFIRM_MODAL,
        resolve: {
          bodyMessageKey: () => 'LEAVE_CONFIRM_MESSAGE'
        }
      }).result.then(result => {
        this.authService.newLogout();
        this.$state.go(this.stateConst.AUTH_LOGIN.name);
      });
    }

    goToAddCertificate() {
      this.$state.go(this.stateConst.CERTIFICATE_ADD.name);
    }
  }
};
