export const loginComponent = {
  template: require('./login.html'),
  controller: class LoginComponent {
    static $inject = ['AuthService', '$state', '$rootScope', 'stateConst'];

    constructor(AuthService, $state, $rootScope, stateConst) {

      this.authService = AuthService;
      this.$state = $state;
      this.$rootScope = $rootScope;
      this.stateConst = stateConst;
    }

    login(event) {
        this.authService
          .newLogin(event.user)
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
