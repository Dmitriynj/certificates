import { certificateEditFormComponent } from './certificate-edit-form.component';

export const certificateEditForm = angular
  .module('components.home.certificate-edit-from', [])
  .component('certificateEditForm', certificateEditFormComponent)
  .name;

