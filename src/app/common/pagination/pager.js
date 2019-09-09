export function pager(totalItems, currentPage, pageSize) {
  // default to first page
  currentPage = currentPage || 1;

  // default page size is 10
  pageSize = pageSize || 10;

  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  let startPage = 0;
  let endPage = 0;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  let pages = [];
  let size = endPage - startPage + 1;
  let index = startPage;
  for (let i = 0; i < size; i++) {
    pages[i] = index;
    index++;
  }

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}
