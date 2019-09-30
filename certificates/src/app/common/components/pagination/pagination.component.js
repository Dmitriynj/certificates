import {pager} from './pager';

export const paginationComponent = {
  bindings: {
    pagerProps: '<',
    onPageChange: '&'
  },
  template: require('./pagination.html'),
  controller: class PaginationController {
    static $inject = [];

    constructor() {
    }

    $onChanges(changes) {
      if (changes.pagerProps) {
        this.pagerProps = angular.copy(this.pagerProps);
        this.setPager();
      }
    }

    setPager() {
      this.pager = pager(this.pagerProps.number, this.pagerProps.currentPage, this.pagerProps.pageSize);
    }

    setPage(page) {
      this.onPageChange({
        $event: {
          page: page
        },
      })
    }
  }
};
