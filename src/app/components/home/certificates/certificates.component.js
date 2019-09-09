export const certificatesComponent = {
  bindings: {
    certificates: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    static $inject = ['$filter', '$state', 'AuthService', 'CertificateService'];

    constructor($filter, $state, AuthService, CertificateService) {

      this.$filter = $filter;
      this.$state = $state;
      this.authService = AuthService;
      this.certificateService = CertificateService;
    }

    $onInit() {
      this.currentPage = 1;
      this.pageSize = 9;
      this.items = this.certificates;
      this.queryTags = [];
      this.showMy = false;
      this.authService.getUser().then(response => {
        this.user = response;
      });
    }

    $onChanges(changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    }

    addQueryTag(event) {
      let queryTagNames = this.queryTags.map((tag) => tag.name);
      if (!queryTagNames.includes(event.tag.name)) {
        this.queryTags.push(event.tag);
        this.filterCertificates(this.search, this.queryTags);
      }
    }

    removeQueryTag(tag) {
      let index = this.queryTags.indexOf(tag);
      if (index > -1) {
        this.queryTags.splice(index, 1);
        this.filterCertificates(this.search, this.queryTags);
      }
    }

    showItems(event) {
      this.sertificatesToShow = event.items;
    }

    filterCertificates(input, queryTags) {
      let filtered = this.certificates;
      if (!!input) {
        filtered = this.$filter('certificateInputFilter')(filtered, input);
      }
      if (!!queryTags && !!queryTags.length) {
        filtered = this.$filter('certificateTagsFilter')(filtered, queryTags);
      }
      if (this.showMy && this.user.certificates && this.user.certificates.length > 0) {
        filtered = this.$filter('myCertificatesFilter')(filtered, this.user.certificates);
      }
      this.emptyMessage = filtered.length === 0;
      this.items = filtered;
    }

    showMyCertificates() {
      this.showMy = true;
      this.filterCertificates(this.search, this.queryTags);
    }

    showAllCertificates() {
      this.showMy = false;
      this.filterCertificates(this.search, this.queryTags);
    }

    onDeleteCertificate() {
      this.$state.reload();
    }

    onCellCertificate() {
      if(this.showMy) {
        this.filterCertificates(this.search, this.queryTags);
      }
    }

    // confirmAction() {
    //   this.showConfirmationModal = true;
    // }
  }
};




