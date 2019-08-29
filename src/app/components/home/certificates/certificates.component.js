export const certificatesComponent = {
  bindings: {
    getAllCertificates: '<',
    filter: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    constructor(PagerService, CertificateService) {
      'ngInject';

      this.certificateService = CertificateService;
      this.pagerService = PagerService;
      this.pager = {};
    }

    $onInit() {
      this.queryTags = [];
      this.allCertificates = [];
      this.currentPage = 1;
      this.pageSize = 9;
      this.pager = new this.pagerService.constructor();

      let $ctrl = this;
      this.certificateService.getAllCertificates().then((response) => {
        $ctrl.allCertificates = response.data;

        $ctrl.allCertificates.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
          return 0;
        });

        $ctrl.pager.init($ctrl.allCertificates.length, 1, $ctrl.pageSize);
      });
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

    setPage(page) {
      this.currentPage = page;
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }

      this.pager.init(this.allCertificates.length, page, this.pageSize);
      this.certificates = this.allCertificates.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }


  }
};


