import { languageComponent } from './language.component';
import angularTranslate from'angular-translate/dist/angular-translate';
import staticLoader from 'angular-translate-loader-static-files/angular-translate-loader-static-files';

export const lang = angular
  .module('language', [
    angularTranslate,
    staticLoader
  ])
  .component('languageComponent', languageComponent)
  .config(config)
  .run(run)
  .name;


config.$inject = ['$translateProvider'];
function config($translateProvider) {
  $translateProvider
    .useStaticFilesLoader({
      prefix: '/locales/locale-',
      suffix: '.json'
    })
    // remove the warning from console log by putting the sanitize strategy
    .useSanitizeValueStrategy('sanitizeParameters')
    .preferredLanguage('en');
}

run.$inject = ['$rootScope'];
function run($rootScope) {
  $rootScope.lang = 'en';
}
