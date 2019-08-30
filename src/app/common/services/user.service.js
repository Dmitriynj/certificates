export class UserService {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
  }

  getUserByEmail(email) {
    return this.getAllUsers().then((response) => {
      let users = response.data;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return users[i];
        }
      }
      return {};
    });
  }

  getAllUsers() {

    let deferred = this.$q.defer();

    this.$http.get('/data/users.json').then((response) => {
      deferred.resolve(response);
    }, (error) => {
      deferred.reject(error);
    });

    return deferred.promise;
  }
}
