export const registerComponent = {
  template: require('./register.html'),
  controller: class RegisterComponent {
    static $inject = ['AuthService', '$state', 'stateConst'];

    constructor(AuthService, $state, stateConst) {

      this.authService = AuthService;
      this.$state = $state;
      this.stateConst = stateConst;
    }

    $onInit() {

      this.emailFieldModel = {
        fieldNameKey: 'EMAIL',
        fieldType: 'email',
        required: true,
        maxlength: 30,
        haveCustomFun: false,
      };
      this.passwordFieldModel = {
        fieldNameKey: 'PASSWORD',
        minlength: 4
      };
      this.cPasswordFieldModel = {
        fieldNameKey: 'CONFIRM_PASSWORD',
        minlength: 4
      };
    }

    createUser() {
      return this.authService
        .newRegister({
          email: this.emailFieldModel.fieldValue,
          password: this.cPasswordFieldModel.fieldValue
        })
        .then(() => {
          this.$state.go(this.stateConst.AUTH_LOGIN.name);
        }, reason => {
          this.message = reason.message;
        });
    }

    updateEmail(event) {
      this.emailFieldModel.fieldValue = event.value;
    }

    goToLogin() {
      this.$state.go(this.stateConst.AUTH_LOGIN.name);
    }
  },
};
