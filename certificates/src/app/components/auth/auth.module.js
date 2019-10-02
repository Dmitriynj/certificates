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

run.$inject = ['$transitions', '$state', '$http', '$auth', 'AuthService', 'stateConst'];

function run($transitions, $state, $http, $auth, AuthService, stateConst) {

  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $auth.getToken();

  $transitions.onStart({
    to: () => 'auth.*',
  }, () => {
    if ($auth.isAuthenticated()) {
      $state.go(stateConst.CERTIFICATES.name);
    }
  });

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requiredAuth),
  }, (transition) => {
    return AuthService.requireAuthentication()
      .catch(() => $state.target(stateConst.AUTH_LOGIN.name));
  });

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requirePermission),
  }, (transition) => {
    if (!$auth.isAuthenticated()) {
      $state.got(transition.from().name);
    }
  });
}
