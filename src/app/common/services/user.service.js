export class UserService {
  static $inject = ['$http', '$q', '$localStorage', '$cookies', '$rootScope'];

  constructor($http, $q, $localStorage, $cookies, $rootScope) {

    this.$http = $http;
    this.$q = $q;
    this.$localStorage = $localStorage;
    this.$cookies = $cookies;
    this.$rootScope = $rootScope;
  }

  getUserByEmail(email) {
    return this.getAllUsers().then((response) => {
      let users = response;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return users[i];
        }
      }
      return null;
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

  create(user) {
    this.$localStorage.globals.users.push(user);
  }

  update(user) {
    return this.getUserByEmail(user.email).then((response) => {
      let deferred = this.$q.defer();

      response.email = user.email;
      response.password = user.password;
      response.isAdmin = user.isAdmin;
      response.certificates = user.certificates;

      deferred.resolve(angular.copy(response));
      return deferred.promise;
    });
  }
}
