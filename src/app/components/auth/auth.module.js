import uiRouter from '@uirouter/angularjs';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { authForm } from  './auth-form/auth-form.module';

export const auth = angular
  .module('components.auth', [
    uiRouter,
    login,
    authForm
  ])
  .run(($transitions, $state, AuthService) => {
    'ngInject';

    $transitions.onStart({
      to: (state) => !!(state.data && state.data.requiredAuth),
    }, () => {
      return AuthService.requireAuthentication()
        .catch(() => $state.target('auth.login'));
    });

    $transitions.onStart({
      to: 'auth.*',
    }, () => {
      if (AuthService.isAuthenticated())
        return $state.target('certificates');
    });
  })
  .service('AuthService', AuthService)
  .name;
