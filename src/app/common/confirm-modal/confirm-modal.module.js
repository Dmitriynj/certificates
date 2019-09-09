import { confirmModalComponent } from './confirm-modal.component';

export const confirmModal = angular
  .module('confirmationModal', [])
  .component('confirmModalComponent', confirmModalComponent)
  .name;
