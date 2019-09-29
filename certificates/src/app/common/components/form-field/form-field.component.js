export const formFieldComponent = {
  bindings: {
    fieldModel: '<',
    onValidate: '&',
    onUpdate: '&',
  },
  template: require('./form-field.html'),
  controller: class EditableFieldComponent {
    static $inject = [];

    constructor() {
    }

    $onInit() {
    }

    $onChanges(changes) {
      if (changes.fieldModel) {
        this.fieldModel = angular.copy(this.fieldModel);
      }
    }

    validate(value) {
      this.onUpdate({
        $event: {
          value: value
        }
      });
      return this.fieldModel.haveCustomFun ? this.onValidate({ $value: value }) : true;
    }
  }
};
