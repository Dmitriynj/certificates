import {pager} from './pager';

export const paginationComponent = {
  bindings: {
    itemsNumber: '<',
    currentPage: '<',
    pageSize: '<',
    onPageChange: '&'
  },
  template: require('./pagination.html'),
  controller: class PaginationController {
    static $inject = [];

    constructor() {
    }

    $onInit() {
      this.currentPage = this.currentPage || 1;
      this.pageSize = this.pageSize || 9;
      this.setPager(this.currentPage);
    }

    $onChanges(changes) {
      if (changes.itemsNumber) {
        this.itemsNumber = angular.copy(this.itemsNumber);
        if(!!this.pager) {
          this.setPage(this.pager.currentPage);
        }
      }
      if (changes.pageSize) {
        this.pageSize = angular.copy(this.pageSize);
      }
    }

    setPager(page) {
      this.pager = pager(this.itemsNumber, page, this.pageSize);
    }

    setPage(page) {
      this.setPager(page);
      this.onPageChange({
        $event: {
          page: this.pager.currentPage
        },
      })
    }
  }
};
