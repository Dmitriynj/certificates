export const loginComponent = {
  template: require('./login.html'),
  controller: class LoginComponent {
    constructor(AuthService, $state) {
      'ngInject';

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
    }

    login(event) {
        this.authService
          .login(event.user)
          .then(() => {
            this.$state.go('home');
          }, reason => {
            this.error = reason.message;
          });
    }
  }
};
