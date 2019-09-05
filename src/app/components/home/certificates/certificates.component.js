export const certificatesComponent = {
  bindings: {
    certificates: '<',
    queryTags: '&',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    static $inject = ['$filter', '$interval'];

    constructor($filter, $interval) {

      this.$filter = $filter;
      this.$interval = $interval;
    }


    $onInit() {
      this.pageSize = 9;
      this.items = this.certificates;
      this.queryTags = [];
    }

    addQueryTag(event) {
      let queryTagNames = this.queryTags.map((tag) => tag.name);
      if (!queryTagNames.includes(event.tag.name)) {
        this.queryTags.push(event.tag);
        this.updateCertificates(this.search, this.queryTags);
      }
    }

    removeQueryTag(tag) {
      let index = this.queryTags.indexOf(tag);
      if (index > -1) {
        this.queryTags.splice(index, 1);
        this.updateCertificates(this.search, this.queryTags);
      }
    }

    showItems(event) {
      this.sertificatesToShow = event.items;
    }

    updateCertificates(input, queryTags) {
      let filtered = this.certificates;
      if (!!input) {
        filtered = this.$filter('certificateInputFilter')(filtered, input);
      }
      if (!!queryTags && !!queryTags.length) {
        filtered = this.$filter('certificateTagsFilter')(filtered, queryTags);
      }
      this.items = filtered;
    }
  }
};




