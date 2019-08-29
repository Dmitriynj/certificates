export const certificateTagComponent = {
  bindings: {
    tags: '<',
    // tagValue: '<',
    onAddTag: '&'
  },
  template: require('./certificate-tag.html'),
  controller: class CertificateTagComponent {
    constructor() {
      'ngInject';
    }

    // $onInit() {
    //   this.tagValue = null;
    // }
    //
    // $onChanges(changes) {
    //   if (changes.tagValue) {
    //     this.tagValue = angular.copy(this.tagValue);
    //   }
    // }

    addTag(index) {
      this.onAddTag({
        $event: {
          tag: this.tags[index],
        }
      });
    }
  }
};
