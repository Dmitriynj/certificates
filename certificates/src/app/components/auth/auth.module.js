import uiRouter from '@uirouter/angularjs';
import {AuthService} from './auth.service';
import {login} from './login/login.module';
import {authForm} from './auth-form/auth-form.module';
import {register} from "./register/register.module";
import satellizer from 'satellizer/dist/satellizer';

export const auth = angular
  .module('components.auth', [
    uiRouter,
    login,
    register,
    authForm,
    satellizer
  ])
  .config(config)
  .run(run)
  .service('AuthService', AuthService)
  .name;

config.$inject = ['$authProvider', 'appConst'];

function config($authProvider, appConst) {
  $authProvider.signupUrl = appConst.API + 'auth/register';
  $authProvider.loginUrl = appConst.API + 'auth/login';
}

run.$inject = ['$transitions', '$state', '$http', '$timeout', '$auth', 'AuthService', 'stateConst'];

function run($transitions, $state, $http, $timeout, $auth, AuthService, stateConst) {

  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $auth.getToken();

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requiredAuth),
  }, () => {
    return AuthService.requireAuthentication()
      .catch(() => $state.target(stateConst.AUTH_LOGIN.name));
  });

  $transitions.onStart({
    to: stateConst.AUTH.name + '.*',
  },  () => {
    if ($auth.isAuthenticated()) {
      return $state.target(stateConst.CERTIFICATES.name);
    }
  });
}
