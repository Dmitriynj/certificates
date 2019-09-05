export const navComponent ={
  bindings: {
    user: '&',
    onLogout: '&'
  },
  template: require('./app-nav.html'),
  controller: class AppNavComponent {
    static $inject = ['AuthService', '$state', '$rootScope'];
    constructor(AuthService, $state, $rootScope) {

      this.authService = AuthService;
      this.$state = $state;
    }

    $onInit() {
      this.user = this.authService.getUser();
    }

    logout() {
      return this.authService
        .logout()
        .then(() => this.$state.go('auth.login'));
    }
  }
};
