import {confirmModalComponent} from "./confirm-modal.component";
import modal from 'ui-bootstrap4/src/modal';

export const confirmModal = angular
  .module('confirmModal', [
    modal
  ])
  .component('confirmModalComponent', confirmModalComponent)
  .name;
