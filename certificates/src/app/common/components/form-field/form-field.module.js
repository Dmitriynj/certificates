import {formFieldComponent} from "./form-field.component";
import ngMessages from 'angular-messages';

export const formField = angular
  .module('formField', [
    ngMessages
  ])
  .component('formFieldComponent', formFieldComponent)
  .name;
