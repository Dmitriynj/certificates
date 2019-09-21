export const formComponent = {
  bindings: {
    user: '<',
    link: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  template: require('./auth-form.html'),
  controller: class LoginComponent {
    static $inject = [];

    constructor() {

      this.maxlength = 30;
      this.minlength = 4;
      this.message = null;
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
