export const certificatesComponent = {
  bindings: {
    certificates: '<',
    filter: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    constructor($state, $filter, CertificateService) {
      'ngInject';
    }

    $onInit() {
      this.queryTags = [];
      this.certificates.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });

      this.currentPage = 1;
      this.itemsPerPage = 2;
      this.totalItems = this.certificates.length;
      this.viewby = 2;
      this.itemsPerPage = this.viewby;
    }

    addQueryTag(event) {
      if(!this.queryTags.includes(event.tag)){
        this.queryTags.push(event.tag);
      }
    }

    removeQueryTag(tag) {
      var index = this.queryTags.indexOf(tag);
      if (index > -1) {
        this.queryTags.splice(index, 1);
      }
    }

    setPage() {

    }


  }
};


