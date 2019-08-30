import { certificateEditComponent } from './certificate-edit.component';

export const certificateEdit = angular
  .module('components.home.certificate-edit', [])
  .component('certificateEdit', certificateEditComponent)
  .config(($stateProvider) => {
    'ngInject';

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
  })
  .name;
