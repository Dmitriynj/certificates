export const formComponent = {
  bindings: {
    message: '<',
    onSubmit: '&'
  },
  template: require('./auth-form.html'),
  transclude: true,
  controller: class AuthComponent {
    static $inject = ['$state', 'stateConst'];

    constructor($state, stateConst) {
      this.$state = $state;
      this.stateConst = stateConst;
    }

    $onInit() {

      this.user = {};
      this.emailFieldModel = {
        fieldNameKey: 'EMAIL',
        fieldType: 'email',
        fieldValue: this.user.email,
        required: true,
        maxlength: 30,
        haveCustomFun: false,
      };
      this.passwordFieldModel = {
        fieldNameKey: 'PASSWORD',
        fieldType: 'password',
        fieldValue: this.user.password,
        required: true,
        minlength: 4,
        haveCustomFun: false,
      };
    }

    $onChanges(changes) {
      if(changes.message) {
        this.message = angular.copy(this.message);
      }
    }

    submitForm() {
      this.onSubmit({
        $event: {
          user: this.user,
        },
      });
    }

    updateEmail(event) {
      this.user.email = event.value;
    }

    updatePassword(event) {
      this.user.password = event.value;
    }

    goToRegister() {
      this.$state.go(this.stateConst.AUTH_REGISTRATION.name);
    }
  }
};
