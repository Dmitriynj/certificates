

export const paginationComponent = {
  bindings: {
    items: '<',
    pageSize: '<',
    onShowItems: '&'
  },
  template: require('./pagination.html'),
  controller: class PaginationController {
    constructor(PagerService) {
      'ngInject';

      this.pagerService = PagerService;
    }

    $onInit() {
      this.currentPage = 1;
      this.pageSize = this.pageSize || 9;
      this.pager = new this.pagerService.constructor();
      this.pager.init(this.items.length, this.currentPage, this.pageSize);
      this.setPage(1);
    }

    setPage(page) {
      this.currentPage = page;
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }

      this.pager.init(this.items.length, page, this.pageSize);
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
