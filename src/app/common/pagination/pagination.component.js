import { getPager } from './getpager';

export const paginationComponent = {
  bindings: {
    items: '<',
    pageSize: '<',
    onShowItems: '&'
  },
  template: require('./pagination.html'),
  controller: class PaginationController {
    static $inject = [];

    constructor() {
    }

    $onInit() {
      this.currentPage = 1;
      this.pageSize = this.pageSize || 9;
      this.setPage(1);
    }

    $onChanges(changes) {
      if(changes.items) {
        this.items = angular.copy(this.items);
        this.setPage(this.currentPage);
      }
    }

    setPage(page) {
      this.pager = getPager(this.items.length, page, this.pageSize);

      this.itemsToShow = this.items.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );

      this.showItems();
    }

    showItems() {
      this.onShowItems({
        $event: {
          items: this.itemsToShow
        },
      })
    }
  }
};
