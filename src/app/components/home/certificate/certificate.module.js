import { certificateComponent } from './certificate.component';

export const certificateSingle = angular
  .module('components.home.certificate', [])
  .component('certificate', certificateComponent)
  .name;
