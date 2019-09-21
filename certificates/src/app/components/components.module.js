import { auth } from './auth/auth.module';
import { home } from './home/home.module';

export const components = angular
  .module('components', [
    auth,
    home,
  ])
  .name;
