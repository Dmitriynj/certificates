export const certificatesComponent = {
  bindings: {
    cData: '<',
  },
  template: require('./certificates.html'),
  controller: class CertificatesComponent {
    static $inject = ['$filter', '$stateParams', '$state', 'CertificateService', 'OrderItemService', 'appConst'];

    constructor($filter, $stateParams, $state, CertificateService, OrderItemService, appConst) {

      this.$filter = $filter;
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.certificateService = CertificateService;
      this.orderItemService = OrderItemService;
      this.appConst = appConst;
    }

    $onInit() {
      this.orderedItems = this.cData.orderedItems;
      this.items = this.cData.orderedItems.map(item => item.certificate);
      this.haveOwnCertificates = this.cData.haveCertificates;
      this.number = this.cData.number;

      this.pagerProps = {
        number: this.number,
        pageSize: this.appConst.CERTIFICATES_PAGE_SIZE,
        currentPage: this.appConst.START_PAGE,
      };

      this.filter = {
        tags: []
      };

      this.sortableOptions = {
        stop: (event, ui) => {
          this.onStopSortable(event, ui);
        },
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
      this.pagerProps.currentPage = this.appConst.START_PAGE;
      this.filterCertificates();
    }

    showMyCertificates() {
      this.filter.my = true;
      this.pagerProps.currentPage = this.appConst.START_PAGE;
      this.filterCertificates();
    }

    async filterCertificates() {
      this.cData = await this.certificateService.getFiltered(
        this.pagerProps.pageSize,
        this.pagerProps.currentPage,
        this.filter);

      this.orderedItems = this.cData.orderedItems;
      this.items = this.cData.orderedItems.map(item => item.certificate);
      this.haveOwnCertificates = this.cData.haveCertificates;
      this.number = this.cData.number;

      this.pagerProps = {
        number: this.number,
        pageSize: this.pagerProps.pageSize,
        currentPage: this.pagerProps.currentPage
      };
    }

    async onStopSortable(event, ui) {
      const orderedItemsToUpdate = [];
      for (let i = 0; i < this.orderedItems.length; i++) {
        const oldCertificateId = this.orderedItems[i].certificate._id;
        const newCertificateId = this.items[i]._id;
        if (oldCertificateId !== newCertificateId) {
          orderedItemsToUpdate.push({
            _id: this.orderedItems[i]._id,
            certificateId: this.items[i]._id
          });
          this.orderedItems[i].certificate = this.items[i];
        }
      }

      await this.orderItemService.updateOrder(
        this.pagerProps.pageSize,
        this.pagerProps.page,
        orderedItemsToUpdate);
    }

    onBuyCertificate(event) {
      if (!this.haveOwnCertificates) {
        this.haveOwnCertificates = true;
      }
    }

    onCellCertificate(event) {
      if (this.filter.my) {
        this.orderedItems = this.orderedItems.filter(item => item.certificate._id !== event._id);
        if (this.orderedItems.length === 0) {
          this.filter.my = false;
          this.filterCertificates();
        }
        this.items = this.orderedItems.map(item => item.certificate);
      } else {
        this.filterCertificates();
      }
    }

    onDeleteCertificate() {
      this.filterCertificates();
    }
  }
};




