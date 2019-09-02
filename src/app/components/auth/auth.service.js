export class AuthService {
  constructor($rootScope, $cookies, $http, $q, UserService) {
    'ngInject';

    this.$q = $q;
    this.userService = UserService;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this.$http = $http;
    this.authData = null;
    this.users = [
      {
        email: 'admin@epam.com',
        password: 'admin'
      }
    ];
    this.user = {
      email: 'admin@epam.com',
      password: 'admin'
    };
  }

  login(user) {
    let obj = this;
    return this.userService.getUserByEmail(user.email).then((response) => {
      let deferred = obj.$q.defer();

      let userFromDb = response;
      if(!!userFromDb && userFromDb.password === user.password) {
        userFromDb.password = Base64.encode(userFromDb.password);
        obj.authData = userFromDb;

        let authdata = Base64.encode(userFromDb.email + ':' + userFromDb.password + ':' + userFromDb.requireAdmin);
        obj.$rootScope.globals = {
          currentUser: userFromDb
        };
        obj.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        let cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        obj.$cookies.putObject('globals', obj.$rootScope.globals, {expires: cookieExp});

        deferred.resolve();
        return;
      }

      deferred.reject({message: 'Error with auth!'});

      return deferred.promise;
    });
  }

  logout() {
    let obj = this;
    return new Promise((resolve, reject) => {
      obj.authData = null;
      obj.$rootScope.globals = {};
      obj.$cookies.remove('globals');
      obj.$http.defaults.headers.common.Authorization = 'Basic';
      resolve();
    });
  }

  getUser() {
    if (!!this.$cookies.getObject('globals')) {
      let currentUser = this.$cookies.getObject('globals').currentUser;
      currentUser.password = Base64.decode(currentUser.password);
      return currentUser;
    }
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

  requireAdmin() {
    let deferred = this.$q.defer();

    let user = this.getUser();
    if(user && user.isAdmin) {
      deferred.resolve();
    } else {
      deferred.reject("You are not authenticated!");
    }

    return deferred.promise;
  }

  register(user) {
    return new Promise((resolve, reject) => {
      this.users[length] = user;
      this.login(user);
      resolve();
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
