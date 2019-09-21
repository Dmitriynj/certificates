import { pager } from './pager';

export const paginationComponent = {
  bindings: {
    items: '<',
    currentPage: '<',
    pageSize: '<',
    onShowItems: '&'
  },
  template: require('./pagination.html'),
  controller: class PaginationController {
    static $inject = [];

    constructor() {
    }

    $onInit() {
      this.currentPage = this.currentPage || 1;
      this.pageSize = this.pageSize || 9;
      this.setPage(this.currentPage);
    }

    $onChanges(changes) {
      if(changes.items) {
        this.items = angular.copy(this.items);
        this.setPage(this.currentPage);
      }
      if(changes.pageSize) {
        this.pageSize = angular.copy(this.pageSize);
        this.setPage(1);
      }
    }

    setPage(page) {
      this.pager = pager(this.items.length, page, this.pageSize);
      this.itemsToShow = this.items.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1);
      this.onShowItems({
        $event: {
          items: this.itemsToShow
        },
      })
    }
  }
};
