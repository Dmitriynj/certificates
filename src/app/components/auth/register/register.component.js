export const registerComponent = {
  template: require('./register.html'),
  controller: class RegisterComponent {
    static $inject = ['AuthService', '$state'];

    constructor(AuthService, $state) {

      this.authService = AuthService;
      this.$state = $state;
    }
    $onInit() {
      this.maxlength = 30;
      this.minlength = 4;
      this.error = null;
      this.user = {
        email: '',
        password: '',
      };
      this.link = {
        state: 'auth.login',
        name: 'Log in'
      }
    }
    createUser(event) {
      return this.authService
        .register(event.user)
        .then(() => {
          this.$state.go('certificates');
        }, reason => {
          this.error = reason.message;
        });
    }
  },
};
