export class UserService {
  constructor($http, $q, $localStorage) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.$localStorage = $localStorage;
  }

  getUserByEmail(email) {
    return this.getAllUsers().then((response) => {
      let users = response;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return users[i];
        }
      }
      return {};
    });
  }

  /**
   *  this.$http.get('/data/users.json').then((response) => {
   *    deferred.resolve(response);
   *  }, (error) => {
   *    deferred.reject(error);
   *  });
   *
   */
  getAllUsers() {
    let deferred = this.$q.defer();

    let users = this.$localStorage.globals.users;
    deferred.resolve(users);

    return deferred.promise;
  }

  update(user) {

  }
}
