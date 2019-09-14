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
    let defer = this.$q.defer();
    let certificates = this.$localStorage.globals.certificates;
    let intId = Number.parseInt(id);
    for (let i = 0; i < certificates.length; i++) {
      if (certificates[i].id === intId) {
        defer.resolve(angular.copy(certificates[i]));
      }
    }
    defer.reject('Certificate with the given id was not found!');
    return defer.promise;
  }

  getByIdToChange(id) {
    let defer = this.$q.defer();
    let certificates = this.$localStorage.globals.certificates;
    let intId = Number.parseInt(id);
    for (let i = 0; i < certificates.length; i++) {
      if (certificates[i].id === intId) {
        defer.resolve(certificates[i]);
      }
    }
    defer.reject('Certificate with the given id was not found!');
    return defer.promise;
  }

  async update(certificate) {
    let defer = this.$q.defer();
    let certificateToUpdate = await this.getByIdToChange(certificate.id);
    certificateToUpdate.title = certificate.title;
    certificateToUpdate.description = certificate.description;
    certificateToUpdate.cost = certificate.cost;
    certificateToUpdate.tags = certificate.tags;
    certificateToUpdate.date = certificate.date;
    defer.resolve();
    return defer.promise;
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

  create(certificate) {
    let defer = this.$q.defer();

    let certificates = this.$localStorage.globals.certificates;
    let lastCertificateId = certificates.slice(-1).pop().id;
    certificate.id = lastCertificateId + 1;
    certificates.push(certificate);

    defer.resolve();
    return defer.promise;
  }
}
