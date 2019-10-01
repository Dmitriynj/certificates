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
      this.sortableOptions = {
        start: (event, ui) => {
          this.onStartSortable(event, ui);
        },
        update: (event, ui) => {
          this.onUpdateSortable(event, ui)
        },
        stop: (event, ui) => {
          this.onStopSortable(event, ui);
        },
        connectWith: ".tags-container"
      }
    }

    onStartSortable(event, ui) {
      this.savedTagsArray = event.ctrlKey ? this.tags.slice() : undefined;
    }

    onUpdateSortable(event, ui) {
      if (ui.item.sortable.received) {
        this.updateTags();
      }

      if (!ui.item.sortable.received &&
        ui.item.sortable.source[0] !== ui.item.sortable.droptarget[0]) {

        const originNgModel = ui.item.sortable.sourceModel;
        const itemModel = originNgModel[ui.item.sortable.index];
        const targetModel = ui.item.sortable.droptargetModel;

        const cancel = !!targetModel
          .filter(tag => tag === itemModel)
          .length;

        if (cancel) {
          ui.item.sortable.cancel();
        }
      }
    }

    onStopSortable(event, ui) {
      if (!!this.savedTagsArray) {
        this.tags = this.savedTagsArray;
      }
      this.updateTags();
    }

    updateTags() {
      this.onUpdateTags({
        $event: {
          tags: this.tags,
        }
      });
    }

    addTag(tag) {
      this.onAddTag({
        $event: {
          tag,
        }
      });
    }

  }
};
