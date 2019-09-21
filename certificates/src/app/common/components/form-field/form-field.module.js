import {formFieldComponent} from "./form-field.component";

export const formField = angular
  .module('formField', [])
  .component('formFieldComponent', formFieldComponent)
  .name;
