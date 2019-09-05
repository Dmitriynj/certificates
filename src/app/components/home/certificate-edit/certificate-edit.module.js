import { certificateEditComponent } from './certificate-edit.component';


export const certificateEdit = angular
  .module('components.home.certificate-edit', [])
  .component('certificateEdit', certificateEditComponent)
  .config(config)
  .name;

config.$inject = ['$stateProvider'];
function config($stateProvider) {

  $stateProvider
    .state('certificate-edit', {
      parent: 'app',
      url: '/certificate/:certificateId/edit',
      component: 'certificateEdit',
      parameter: {
        certificateId: 0
      },
      data: {
        requireAdmin: true,
      },
    })
}
