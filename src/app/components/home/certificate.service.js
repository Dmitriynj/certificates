export class CertificateService {
  constructor($cookies, $localStorage, $q) {
    'ngInject';

    this.$localStorage = $localStorage;
    this.$q = $q;
    this.certificates = {};
    this.certificates.data = $localStorage.globals.certificates;
  }

  /**
   * Should be return this.$http.get('/data/fewCertificates.json');
   * @returns {Promise<any>}
   */
  getAllCertificates() {
    let deferred = this.$q.defer();
    deferred.resolve(this.certificates);
    return deferred.promise;
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      let certificates = this.$localStorage.globals.certificates;
      let intId = Number.parseInt(id);
      for(let i=0; i<certificates.length; i++) {
        if(certificates[i].id === intId) {
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





}
