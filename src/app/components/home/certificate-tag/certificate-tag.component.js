export const certificateTagComponent = {
  bindings: {
    tags: '<',
    onAddTag: '&'
  },
  template: require('./certificate-tag.html'),
  controller: class CertificateTagComponent {
    static $inject = [];

    constructor() {
    }

    addTag(index) {
      this.onAddTag({
        $event: {
          tag: this.tags[index],
        }
      });
    }
  }
};
