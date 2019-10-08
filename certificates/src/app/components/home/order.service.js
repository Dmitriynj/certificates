export class OrderService {
  static $inject = ['$http', '$auth', 'appConst'];

  constructor($http, $auth, appConst) {

    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;
  }

  buyCertificate(id) {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'order/' + id)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }

  cellCertificate(id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(this.appConst.API + 'order/' + id)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }
}
