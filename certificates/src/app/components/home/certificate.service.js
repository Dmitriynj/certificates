export class CertificateService {
  static $inject = ['$http', '$auth', 'appConst'];

  constructor($http, $auth, appConst) {

    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;
  }


  filterCertificates(limit, filter) {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'certificate/filter/' + limit, {filter})
        .then(result => {
          resolve(result.data);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }

  paginateCertificates(limit, offset, filter) {
    return new Promise((resolve, reject) => {
      this.$http.post(
        this.appConst.API + 'certificate/paginate/' + limit + '/' + offset, { filter })
        .then(result => {
          resolve(result.data);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }

  updateCertificate(certificate) {
    return new Promise((resolve, reject) => {
      this.$http.put(this.appConst.API + 'certificate/update/' + certificate._id, certificate)
        .then(result => {
          resolve(result.data);
        }, error => {
          reject(error);
        });
    });
  }

  filterUserCertificates(limit, filter) {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'usercertificate/filter/' + limit, {filter})
        .then(result => {
          resolve(result.data);
        }, error => {
          console.log(error);
          reject(error);
        })
    });
  }

  buyCertificate(certificate) {
    return new Promise((resolve, reject) => {
      this.$http.put(this.appConst.API + 'usercertificate/add', certificate)
        .then(result => {
          resolve(result.data);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }

  cellCertificate(certificate) {
    return new Promise((resolve, reject) => {
      this.$http.delete(this.appConst.API + 'usercertificate/delete', certificate)
        .then(result => {
          resolve(result.data);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }
}
