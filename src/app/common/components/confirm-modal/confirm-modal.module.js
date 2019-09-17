import {confirmModalComponent} from "./confirm-modal.component";

export const confirmModal = angular
  .module('confirmModal', [
    'ui.bootstrap'
  ])
  .config(config)
  .component('confirmModalComponent', confirmModalComponent)
  .name;

config.$inject = ['$uibModalProvider'];
function config($uibModalProvider) {
  $uibModalProvider.options.windowClass = 'show';
  $uibModalProvider.options.backdropClass = 'show';
}
