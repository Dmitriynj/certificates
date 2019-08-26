export const navComponent ={
  bindings: {
    user: '<',
    onLogout: '&'
  },
  template: require('./app-nav.html'),
  controller: class AppNavComponent {

    constructor(AuthService, $state) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
      this.user = AuthService.getUser();
    }

    logout() {
      return this.authService
        .logout()
        .then(() => this.$state.go('auth.login'));
    }
  }
};
