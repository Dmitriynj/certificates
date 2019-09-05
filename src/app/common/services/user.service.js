export class UserService {
  static $inject = ['$http', '$q', '$localStorage'];

  constructor($http, $q, $localStorage) {

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

  create(user) {
    this.$localStorage.globals.users.push(user);
  }

  update(user) {
    return this.getUserByEmail(user.email).then((response) => {
      let deferred = this.$q.defer();

      let userFromDb = response;
      userFromDb.email = user.email;
      userFromDb.password = user.password;
      userFromDb.isAdmin = user.isAdmin;
      userFromDb.certificates = user.certificates;

      deferred.resolve(userFromDb);
      return deferred.promise;
    });
  }
}
