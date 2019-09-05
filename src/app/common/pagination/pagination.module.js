import { paginationComponent } from './pagination.component';

export const pagination = angular
  .module('pagination', [])
  .component('paginationComponent', paginationComponent)
  .name;
