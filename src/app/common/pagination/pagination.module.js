import { PagerService } from './pagination.service';
import { paginationComponent } from './pagination.component';

export const pagination = angular
  .module('pagination', [
  ])
  .component('paginationComponent', paginationComponent)
  .service('PagerService', PagerService)
  .name;
