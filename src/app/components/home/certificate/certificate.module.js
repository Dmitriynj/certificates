import {certificateComponent} from './certificate.component';
import {AuthService} from "../../auth/auth.service";
import uiRouter from '@uirouter/angularjs';
import {certificateEdit} from "../certificate-edit/certificate-edit.module";
import {certificateEditForm} from "../certificate-form/certifiate-form.module";

export const certificateSingle = angular
  .module('components.home.certificate', [
    uiRouter,
    certificateEdit,
    certificateEditForm,
  ])
  .component('certificate', certificateComponent)
  .service('AuthService', AuthService)
  .name;
