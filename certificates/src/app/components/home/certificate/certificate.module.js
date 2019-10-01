import {certificateComponent} from './certificate.component';
import {AuthService} from "../../auth/auth.service";
import uiRouter from '@uirouter/angularjs';
import modal from 'ui-bootstrap4/src/modal';

export const certificateSingle = angular
  .module('components.home.certificate', [
    uiRouter,
    modal
  ])
  .component('certificate', certificateComponent)
  .service('AuthService', AuthService)
  .name;
