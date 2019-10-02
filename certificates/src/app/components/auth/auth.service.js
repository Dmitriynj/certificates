export class AuthService {
  static $inject = ['$http', '$auth', 'appConst'];

  constructor($http, $auth, appConst) {

    this.$http = $http;
    this.$auth = $auth;
    this.appConst = appConst;

    this.storeAuthData = (data) => {
      this.authData = data;
      return this.authData;
    };
    this.clearAuthData = () => {
      this.authData = null;
    };
  }

  register(user) {
    return new Promise((resolve, reject) => {
      this.$auth.signup(user)
        .then(resolve)
        .catch(reason => reject(reason.data));
    });
  }

  login(user) {
    return new Promise((resolve, reject) => {
      this.$auth.login(user).then(async result => {
        this.$auth.setToken(result.data.token);
        this.storeAuthData(result.data.user);
        resolve();
      }).catch(reason => {
        reject(reason.data);
      });
    });
  }

  logout() {
    this.clearAuthData();
    return this.$auth.logout();
  }

  requireAuthentication() {
    return new Promise((resolve, reject) => {
      this.$http.post(this.appConst.API + 'auth/requireAuthentication')
        .then(result => this.storeAuthData(result.data))
        .then(resolve);
    });
  }

  getUser() {
    return this.authData;
  }
}
