export class CertificateService {
  constructor($cookies, $localStorage) {
    'ngInject';

    this.$localStorage = $localStorage;

    this.certificates = {};
    this.certificates.data = $localStorage.globals.certificates;
  }

  /**
   * Should be return this.$http.get('/data/fewCertificates.json');
   * @returns {Promise<any>}
   */
  getAllCertificates() {
    let thisObj = this;
    return new Promise(((resolve, reject) => {
      resolve(thisObj.certificates);
    }))
  }

  getById(id) {
    let thisObj = this;
    return new Promise((resolve, reject) => {
      let certificates = thisObj.$localStorage.globals.certificates;
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
    let thisObj = this;
    return new Promise((resolve, reject) => {
      let certificateToUpdate = thisObj.getById(certificate.id);
      certificateToUpdate.title = certificate.title;
      certificateToUpdate.description = certificate.description;
      certificateToUpdate.cost = certificate.cost;
      certificateToUpdate.tags = certificate.tags;
      resolve();
    });
  }





}
