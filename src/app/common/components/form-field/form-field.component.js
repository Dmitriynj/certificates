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

    $onChanges(changes) {
      if (changes.fieldModel) {
        this.fieldModel = angular.copy(this.fieldModel);
      }
    }

    update() {
      this.onUpdate({
        $event: {
          fieldValue: this.fieldModel.fieldValue
        }
      })
    }

    validate(value) {
      return this.fieldModel.haveCustomFun ? this.onValidate({ $value: value }) : true;
    }
  }
};
