export const loginComponent = {
  bindings: {
    message: '&'
  },
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
      this.message = null;
      this.user = {
        email: '',
        password: '',
      };
    }

    login(event) {
        this.authService
          .login(event.user)
          .then(() => {
            this.$state.go('certificates');
          }, reason => {
            this.message = reason.message;
          });
    }

    deleteMessage() {
      delete this.message;
    }
  }
};
