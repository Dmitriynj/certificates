export const certificateTagComponent = {
  bindings: {
    tags: '<',
    onAddTag: '&',
    onUpdateTags: '&'
  },
  template: require('./certificate-tag.html'),
  controller: class CertificateTagComponent {
    static $inject = [];

    constructor() {
    }

    $onInit() {
      this.keyBuffer = [];

      this.sortableOptions = {
        start: (event, ui) => {
          /**
           * Copy array if ctrl pressed
           */
          if(event.ctrlKey) {
            this.savedTagsArray = this.tags.slice();
          } else {
            this.savedTagsArray = undefined;
          }
        },
        update: (event, ui) => {

          /**
           * update tags in dropTargetModel
           */
          if(ui.item.sortable.received) {
            this.updateTags();
          }

          if (// ensure we are in the first update() callback
            !ui.item.sortable.received &&
            // check that its an actual moving between the two lists
            ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {

            let originNgModel = ui.item.sortable.sourceModel;
            let itemModel = originNgModel[ui.item.sortable.index];
            let targetModel = ui.item.sortable.droptargetModel;

            let exists = !!targetModel
              .filter(tag => tag.name === itemModel.name)
              .length;

            /**
             * cancel() if have duplicate element
             */
            if (exists) {
              ui.item.sortable.cancel();
            }
          }
        },
        stop: (event, ui) => {

          /**
           * update tags in dropSourceModel
           */
          if(!!this.savedTagsArray) {
            this.tags = this.savedTagsArray;
          }
          this.updateTags();
        },
        connectWith: ".tags-container"
      }
    }

    updateTags() {
      this.onUpdateTags({
        $event: {
          tags: this.tags,
        }
      });
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
