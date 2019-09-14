export class AuthService {
  static $inject = ['$rootScope', '$cookies', '$http', '$q', 'UserService'];

  constructor($rootScope, $cookies, $http, $q, UserService) {

    this.$q = $q;
    this.userService = UserService;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this.$http = $http;
  }

  login(user) {
    return this.userService.getUserByEmail(user.email).then((response) => {
      let deferred = this.$q.defer();

      let userFromDb = angular.copy(response);
      if(!!userFromDb && Base64.decode(userFromDb.password) === user.password) {

        let authdata = Base64.encode(userFromDb.email + ':' + userFromDb.password + ':' + userFromDb.requireAdmin);
        this.$rootScope.globals = {
          currentUser: userFromDb
        };
        this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        let cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        this.$cookies.putObject('globals', this.$rootScope.globals, {expires: cookieExp});

        deferred.resolve();
        return;
      }

      deferred.reject({message: 'Error with auth!'});

      return deferred.promise;
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.$rootScope.globals = {};
      this.$cookies.remove('globals');
      this.$http.defaults.headers.common.Authorization = 'Basic';
      resolve();
    });
  }

  getUser() {
    let deferred = this.$q.defer();
    if (!!this.$cookies.getObject('globals')) {
      let user = this.$cookies.getObject('globals').currentUser;
      this.userService.getUserByEmail(user.email).then(response => {
        let userFromDb = angular.copy(response);
        return deferred.resolve(userFromDb);
      }, error => {
        return deferred.reject("Something was wrong!");
      });
    } else {
      deferred.reject()
    }
    return deferred.promise;
  }

  requireAuthentication() {
    let obj = this;
    return new Promise((resolve, reject) => {
      if (!!obj.$cookies.getObject('globals')) {
        resolve();
      } else {
        reject('Something was wrong!');
      }
    })
  }

  isAuthenticated() {
    return !!this.$cookies.getObject('globals');
  }

  async requireAdmin() {
    let deferred = this.$q.defer();

    let user = await this.getUser();
    if (user && user.isAdmin) {
      deferred.resolve();
    } else {
      deferred.reject("You are not authenticated!");
    }

    return deferred.promise;
  }

  register(user) {
    return this.userService.getUserByEmail(user.email).then((response) => {
      let defer = this.$q.defer();
      if(response === null) {
        user.password = Base64.encode(user.password);
        user.isAdmin = false;
        this.userService.create(user);
        defer.resolve();
      } else {
        defer.reject({ message: 'User already exists!' });
      }
      return defer.promise;
    });
  }
}

// Base64 encoding service used by AuthenticationService
var Base64 = {

  keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  encode: function (input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this.keyStr.charAt(enc1) +
        this.keyStr.charAt(enc2) +
        this.keyStr.charAt(enc3) +
        this.keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
  },

  decode: function (input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      window.alert("There were invalid base64 characters in the input text.\n" +
        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
        "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
      enc1 = this.keyStr.indexOf(input.charAt(i++));
      enc2 = this.keyStr.indexOf(input.charAt(i++));
      enc3 = this.keyStr.indexOf(input.charAt(i++));
      enc4 = this.keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return output;
  }
};
