import {addCertificateComponent} from "./certificate-add.comonent";

export const certificateAdd = angular
  .module('addCertificate', [])
  .component('certificateAdd', addCertificateComponent)
  .config(config)
  .name;

config.$inject = ['$stateProvider'];
function config($stateProvider) {

  $stateProvider
    .state('certificate-add', {
      parent: 'app',
      url: '/certificate/add',
      component: 'certificateAdd',
      data: {
        requireAdmin: true,
      },
    });
}

