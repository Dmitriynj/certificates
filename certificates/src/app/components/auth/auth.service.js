export class AuthService {
  static $inject = ['$rootScope', '$http', '$auth', 'appConst'];

  constructor($rootScope, $http, $auth, appConst) {

    this.$rootScope = $rootScope;
    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'user/getcurrent')
        .then(result => {
          resolve(result.data);
        }, error => {
          reject(error);
        });
    });
  }

  newRegister(user) {
    return new Promise((resolve, reject) => {
      this.$auth.signup(user).then(token => {
        resolve();
      }).catch(reason => {
        reject(reason.data);
      });
    });
  }

  newLogin(user) {
    return new Promise((resolve, reject) => {
      this.$auth.login(user).then(async result => {
        this.$rootScope.user = result.data.user;
        this.$auth.setToken(result.data.token);
        resolve();
      }).catch(reason => {
        reject(reason.data);
      });
    });
  }

  newLogout() {
    this.$auth.logout();
  }
}
