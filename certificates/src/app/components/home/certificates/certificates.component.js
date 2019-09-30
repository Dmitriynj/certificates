export const certificatesComponent = {
  bindings: {
    certificatesData: '<',
    userCertificatesData: '<',
    user: '<',
    queryTags: '&',
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
      this.userCertificateIds = this.userCertificatesData.certificates
        .map(certificate => certificate._id);

      this.pagerProps = {
        number: this.certificatesData.number,
        pageSize: this.appConst.CERTIFICATES_PAGE_SIZE,
        currentPage: 1,
      };

      this.filter = { tags: [] };
      this.showMy = false;
    }

    $onChanges(changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    }

    addQueryTag(event) {
      if (!this.filter.tags.includes(event.tag)) {
        this.filter.tags.push(event.tag);
        this.pagerProps.currentPage = 1;
        this.filterCertificates();
      }
    }

    removeQueryTag(tag) {
      let index = this.filter.tags.indexOf(tag);
      if (index > -1) {
        this.filter.tags.splice(index, 1);
        this.pagerProps.currentPage = 1;
        this.filterCertificates();
      }
    }
    
    onInputChange() {
      this.filter.input = this.search;
      this.pagerProps.currentPage = 1;
      this.filterCertificates();
    }

    onPageChange(event) {
      this.pagerProps.currentPage = event.page;
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

    showMyCertificates() {
      this.showMy = true;
    }

    showAllCertificates() {
    //   this.showMy = false;
    //   this.filterCertificates(this.search, this.queryTags);
    }

    onDeleteCertificate() {
      // this.$state.reload();
    }

    onCellCertificate() {
      // if(this.showMy) {
      //   this.filterCertificates(this.search, this.queryTags);
      // }
    }

    isBoughtCertificate(certificate) {
      return this.userCertificateIds.includes(certificate._id);
    }
  }
};




