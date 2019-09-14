import { certificateFormComponent } from './certificate-form.component';

export const certificateEditForm = angular
  .module('components.home.certificate-edit-from', [])
  .component('certificateForm', certificateFormComponent)
  .name;

