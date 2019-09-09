import { certificateComponent } from './certificate.component';
import {AuthService} from "../../auth/auth.service";
import uiRouter from '@uirouter/angularjs';

export const certificateSingle = angular
  .module('components.home.certificate', [
    uiRouter,
  ])
  .component('certificate', certificateComponent)
  .service('AuthService', AuthService)
  .name;

