import { languageComponent } from './language.component';
import angularTranslate from'angular-translate/dist/angular-translate';
import staticLoader from 'angular-translate-loader-static-files/angular-translate-loader-static-files';
import 'ngstorage/ngStorage.min';

export const lang = angular
  .module('language', [
    angularTranslate,
    staticLoader,
    'ngStorage',
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
    .useSanitizeValueStrategy('sanitizeParameters');
}

run.$inject = ['$localStorage', '$translate'];
function run($localStorage, $translate) {
  $translate.use($localStorage.globals.lang || 'en')
}
