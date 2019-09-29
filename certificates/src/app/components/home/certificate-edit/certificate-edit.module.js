import { certificateEditComponent } from './certificate-edit.component';

export const certificateEdit = angular
  .module('components.home.certificate-edit', [])
  .component('certificateEdit', certificateEditComponent)
  .config(config)
  .name;

config.$inject = ['$stateProvider', 'stateConst', 'componentConst'];
  function config($stateProvider, stateConst, componentConst) {

  $stateProvider
    .state(stateConst.CERTIFICATE_EDIT.name, {
      parent: stateConst.APP.name,
      url: stateConst.CERTIFICATE_EDIT.url,
      component: componentConst.CERTIFICATE_EDIT,
      parameter: {
        certificateId: 0
      },
      data: {
        requireAdmin: true,
      },
    });
}
