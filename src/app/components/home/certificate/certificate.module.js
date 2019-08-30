import { certificateComponent } from './certificate.component';
import {AuthService} from "../../auth/auth.service";

export const certificateSingle = angular
  .module('components.home.certificate', [])
  .component('certificate', certificateComponent)
  .service('AuthService', AuthService)
  .name;

