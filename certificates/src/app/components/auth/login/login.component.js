export const loginComponent = {
  template: require('./login.html'),
  controller: class LoginComponent {
    static $inject = ['AuthService', '$state', 'stateConst'];

    constructor(AuthService, $state, stateConst) {

      this.authService = AuthService;
      this.$state = $state;
      this.stateConst = stateConst;
    }

    login(event) {
        this.authService
          .login(event.user)
          .then( () => {
            this.$state.go(this.stateConst.CERTIFICATES.name);
          }, reason => {
            this.message = reason.message;
          });
    }

    deleteMessage() {
      delete this.message;
    }
  }
};
