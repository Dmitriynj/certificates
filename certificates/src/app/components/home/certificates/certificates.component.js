export const certificatesComponent = {
  bindings: {
    certificatesData: '<',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    static $inject = ['$filter', '$stateParams', '$state', 'CertificateService', 'appConst'];

    constructor($filter, $stateParams, $state, CertificateService, appConst) {

      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.certificateService = CertificateService;
      this.appConst = appConst;
    }

    $onInit() {
      this.items = this.certificatesData.certificates;
      this.haveOwnCertificates = this.certificatesData.haveCertificates;

      this.pagerProps = {
        number: this.certificatesData.number,
        pageSize: this.appConst.CERTIFICATES_PAGE_SIZE,
        currentPage: this.appConst.START_PAGE,
      };

      this.filter = {
        tags: []
      };
    }

    onPageChange(event) {
      this.pagerProps.currentPage = event.page;
      this.filterCertificates();
    }

    onInputChange() {
      this.filter.input = this.search;
      this.pagerProps.currentPage = this.appConst.START_PAGE;
      this.filterCertificates();
    }

    addQueryTag(event) {
      if (!this.filter.tags.includes(event.tag)) {
        this.filter.tags.push(event.tag);
        this.pagerProps.currentPage = this.appConst.START_PAGE;
        this.filterCertificates();
      }
    }

    removeQueryTag(tag) {
      const index = this.filter.tags.indexOf(tag);
      if (index > -1) {
        this.filter.tags.splice(index, 1);
        this.pagerProps.currentPage = this.appConst.START_PAGE;
        this.filterCertificates();
      }
    }

    showAllCertificates() {
      this.filter.my = false;
      this.filterCertificates();
    }

    showMyCertificates() {
      this.filter.my = true;
      this.filterCertificates();
    }

    async filterCertificates() {
      this.certificatesData = await this.certificateService.filterCertificates(
        this.pagerProps.pageSize,
        this.pagerProps.currentPage,
        this.filter);

      this.items = this.certificatesData.certificates;
      this.pagerProps.number = this.certificatesData.number;

      this.pagerProps = {
        number: this.pagerProps.number,
        pageSize: this.pagerProps.pageSize,
        currentPage: this.pagerProps.currentPage
      };
    }

    onCertificateProductChange(event, certificate) {
      this.haveOwnCertificates = event.haveOwnCertificates;
      if (this.filter.my) {
        const index = this.items.indexOf(certificate);
        if (index > -1) {
          this.items.splice(index, 1);
        }
      }
      if (!this.haveOwnCertificates && this.filter.my) {
        this.filter.my = false;
        this.filterCertificates();
      }
    }
  }
};




