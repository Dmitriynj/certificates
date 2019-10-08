export class OrderItemService {
  static $inject = ['$http', '$auth', 'appConst'];

  constructor($http, $auth, appConst) {

    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;
  }

  updateOrder(limit, page, orderedItems) {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'orderitem/updateOrder/' + limit + '/' + page, {orderedItems})
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    });
  }
}

