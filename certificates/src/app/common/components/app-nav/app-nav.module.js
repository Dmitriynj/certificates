import { navComponent } from './app-nav.component';
import modal from 'ui-bootstrap4/src/modal';

export const appNav = angular
  .module('common.app-nav', [
    modal
  ])
  .component('appNav', navComponent)
  .name;
