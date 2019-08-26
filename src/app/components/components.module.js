import { auth } from './auth/auth.module';

export const components = angular
  .module('components', [
    auth,
  ])
  .name;
