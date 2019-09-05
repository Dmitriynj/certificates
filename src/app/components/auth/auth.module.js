import uiRouter from '@uirouter/angularjs';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { authForm } from  './auth-form/auth-form.module';
import {register} from "./register/register.module";

export const auth = angular
  .module('components.auth', [
    uiRouter,
    login,
    register,
    authForm
  ])
  .run(run)
  .service('AuthService', AuthService)
  .name;

run.$inject = ['$transitions', '$state', 'AuthService'];
function run($transitions, $state, AuthService) {

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requiredAuth),
  }, () => {
    return AuthService.requireAuthentication()
      .catch(() => $state.target('auth.login'));
  });

  $transitions.onStart({
    to: (state) => !!(state.data && state.data.requireAdmin),
  }, () => {
    return AuthService.requireAdmin()
      .catch(() => $state.target('certificates'));
  });

  $transitions.onStart({
    to: 'auth.*',
  }, () => {
    if (AuthService.isAuthenticated())
      return $state.target('app');
  });
}
