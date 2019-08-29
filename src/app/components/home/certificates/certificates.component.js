export const certificatesComponent = {
  bindings: {
    allCertificates: '<',
    filter: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    constructor(PagerService) {
      'ngInject';

      this.pagerService = PagerService;
      this.pager = {};
    }

    $onInit() {
      this.queryTags = [];
      this.allCertificates.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });

      // this.setPage(1);

      this.pager = new this.pagerService.constructor();
      this.pager.init(this.allCertificates.length, 1, 3);

      this.certificates = this.allCertificates.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }

    addQueryTag(event) {
      if (!this.queryTags.includes(event.tag)) {
        this.queryTags.push(event.tag);
      }
    }

    removeQueryTag(tag) {
      var index = this.queryTags.indexOf(tag);
      if (index > -1) {
        this.queryTags.splice(index, 1);
      }
    }

    setPage(page) {
      if (page < 1 || page > this.pager.getTotalPages()) {
        return;
      }

      // this.pager = new this.pagerService.constructor();
      this.pager.init(this.allCertificates.length, page, 3);

      this.certificates = this.allCertificates.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }


  }
};


