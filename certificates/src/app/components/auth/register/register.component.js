export const registerComponent = {
  template: require('./register.html'),
  controller: class RegisterComponent {
    static $inject = ['AuthService', '$state'];

    constructor(AuthService, $state) {

      this.authService = AuthService;
      this.$state = $state;
    }
    $onInit() {
      this.user = {};
      this.link = {
        state: 'auth.login',
        name: 'Log in'
      }
    }
    createUser(event) {
      return this.authService
        .newRegister(event.user)
        .then(() => {
          this.$state.go('certificates');
        }, reason => {
          this.message = reason.message;
        });
    }
  },
};
