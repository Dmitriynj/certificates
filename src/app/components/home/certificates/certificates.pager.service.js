// import underscore from 'underscore/underscore-min.js.map';

export class PagerService {
  constructor() {
    'ngInject';

    this.totalPages = 0;
    this.startPage = 0;
    this.endPage = 0;
    this.endIndex = 0;
    this.currentPage = 0;
    this.pageSize = 0;
    this.pages = 0;
  }

  init(totalItems, currentPage, pageSize) {
    // default to first page
    this.currentPage = currentPage || 1;

    // default page size is 10
    this.pageSize = pageSize || 10;

    // calculate total pages
    this.totalPages = Math.ceil(totalItems / pageSize);

    if (this.totalPages <= 10) {
      // less than 10 total pages so show all
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        this.startPage = 1;
        this.endPage = 10;
      } else if (currentPage + 4 >= this.totalPages) {
        this.startPage = this.totalPages - 9;
        this.endPage = this.totalPages;
      } else {
        this.startPage = currentPage - 5;
        this.endPage = currentPage + 4;
      }
    }

    this.startIndex = (currentPage - 1) * pageSize;
    this.endIndex = Math.min(this.startIndex + pageSize - 1, totalItems - 1);

    this.pages = [];
    let size =  this.getEndPage() - this.getStartPage() + 1;
    let index = this.getStartPage();
    for(let i=0; i<size; i++) {
      this.pages[i] = index;
      index++;
    }
  }

  getTotalPages() {
    return this.totalPages;
  }

  getStartPage() {
    return this.startPage;
  }

  getEndPage() {
    return this.endPage;
  }

  getStartIndex() {
    return this.startIndex;
  }

  getEndIndex() {
    return this.endIndex;
  }

  getPages() {

  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }
}
