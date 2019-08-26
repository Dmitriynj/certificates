export const formComponent = {
  bindings: {
    user: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  template: require('./auth-form.html'),
  controller: class LoginComponent {
    constructor() {
      'ngInject';

      this.maxlength = 30;
      this.minlength = 4;

      this.user = {
        email: '',
        password: ''
      };
    }

    $onChanges(changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    }
    submitForm() {
      this.onSubmit({
        $event: {
          user: this.user,
        },
      });
    }
  }
};
