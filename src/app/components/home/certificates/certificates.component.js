export const certificatesComponent = {
  bindings: {
    certificates: '<',
    filter: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    constructor(CertificateService) {
      'ngInject';

      this.certificateService = CertificateService;
    }

    $onInit() {
      this.pageSize = 9;
      this.allCertificates = this.certificates;
      // this.sertificatesToShow = this.allCertificates;
      this.queryTags = [];

      // this.allCertificates = [];
      // this.currentPage = 1;
      // this.pager = new this.pagerService.constructor();
      //
      // this.certificateService.getAllCertificates().then((response) => {
      //   this.allCertificates = response.data;
      //
      //   this.allCertificates.sort((a, b) => {
      //     if (a.date > b.date) return -1;
      //     if (a.date < b.date) return 1;
      //     return 0;
      //   });
      //
      //   this.pager.init(this.allCertificates.length, 1, this.pageSize);
      // });
    }

    addQueryTag(event) {
      if (!this.queryTags.includes(event.tag)) {
        this.queryTags.push(event.tag);
      }
    }

    removeQueryTag(tag) {
      let index = this.queryTags.indexOf(tag);
      if (index > -1) {
        this.queryTags.splice(index, 1);
      }
    }

    // setPage(page) {
    //   this.currentPage = page;
    //   if (page < 1 || page > this.pager.totalPages) {
    //     return;
    //   }
    //
    //   this.pager.init(this.allCertificates.length, page, this.pageSize);
    //   this.certificates = this.allCertificates.slice(
    //     this.pager.startIndex,
    //     this.pager.endIndex + 1
    //   );
    // }


    showItems(event) {
      this.sertificatesToShow = event.items;
    }
  }
};


