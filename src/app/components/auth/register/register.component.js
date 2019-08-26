export const registerComponent = {
  template: require('./register.html'),
  controller: class RegisterComponent {
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
    createUser(event) {
      return this.authService
        .register(event.user)
        .then(() => {
          this.$state.go('home');
        }, reason => {
          this.error = reason.message;
        });
    }
  },
};
