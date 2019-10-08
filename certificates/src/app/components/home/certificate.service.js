export class CertificateService {
  static $inject = ['$http', '$auth', 'appConst'];

  constructor($http, $auth, appConst) {

    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;
  }

  getFiltered(limit, page, filter) {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'certificate/filter/' + limit + '/' + page, {filter})
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }

  update(certificate) {
    return new Promise((resolve, reject) => {
      this.$http.patch(this.appConst.API + 'certificate/' + certificate._id, certificate)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(this.appConst.API + 'certificate/' + id)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.$http.get(this.appConst.API + 'certificate/' + id)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }
}
