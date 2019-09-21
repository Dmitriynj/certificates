import uiRouter from '@uirouter/angularjs';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { authForm } from  './auth-form/auth-form.module';
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

config.$inject = ['$authProvider'];
function config($authProvider) {
  $authProvider.signupUrl = 'http://localhost:5000/' + 'auth/register';
  $authProvider.loginUrl = 'http://localhost:5000/' + 'auth/login';
}

run.$inject = ['$transitions', '$state', '$auth'];
function run($transitions, $state, $auth) {

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requiredAuth),
  }, () => {
    if(!$auth.isAuthenticated()) {
      return $state.target('auth.login');
    }
  });

  // $transitions.onStart({
  //   to: (state) => !!(state.data && state.data.requireAdmin),
  // }, () => {
  //   return AuthService.requireAdmin()
  //     .catch(() => $state.target('certificates'));
  // });

  $transitions.onStart({
    to: 'auth.*',
  }, () => {
    if ($auth.isAuthenticated())
      return $state.target('app');
  });
}
