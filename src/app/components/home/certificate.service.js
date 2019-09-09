export class CertificateService {
  static $inject = ['$cookies', '$localStorage', '$q', 'UserService'];

  constructor($cookies, $localStorage, $q, UserService) {

    this.$localStorage = $localStorage;
    this.$q = $q;
    this.certificates = {};
    this.certificates.data = $localStorage.globals.certificates;
    this.userService = UserService;
  }

  /**
   * Should be return this.$http.get('/data/fewCertificates.json');
   * @returns {Promise<any>}
   */
  getAllCertificates() {
    return this.$q.resolve(this.certificates);
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      let certificates = this.$localStorage.globals.certificates;
      let intId = Number.parseInt(id);
      for (let i = 0; i < certificates.length; i++) {
        if (certificates[i].id === intId) {
          resolve(certificates[i]);
        }
      }
      reject('Certificate with the given id was not found!');
    });
  }

  update(certificate) {
    return new Promise((resolve, reject) => {
      let certificateToUpdate = this.getById(certificate.id);
      certificateToUpdate.title = certificate.title;
      certificateToUpdate.description = certificate.description;
      certificateToUpdate.cost = certificate.cost;
      certificateToUpdate.tags = certificate.tags;
      resolve();
    });
  }

  delete(certificateId) {
    return this.userService.deleteCertificateFromUsers(certificateId).then(response => {
      let defer = this.$q.defer();
      this.certificates.data.forEach((certificate, index) => {
        if (certificate.id === certificateId) {
          this.certificates.data.splice(index, 1);
          defer.resolve();
        }
      });
      defer.reject();
      return defer.promise;
    });
  }
}
