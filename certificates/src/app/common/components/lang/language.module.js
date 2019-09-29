import { languageComponent } from './language.component';
import angularTranslate from'angular-translate';
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
  .name;


config.$inject = ['$translateProvider', '$localStorageProvider'];
function config($translateProvider, $localStorageProvider) {
  let lang = $localStorageProvider.get('lang');
  if(!lang) {
    $localStorageProvider.set('lang', 'en');
    lang = 'en';
  }

  $translateProvider
    .useStaticFilesLoader({
      prefix: '/locales/locale-',
      suffix: '.json'
    })
    // remove the warning from console log by putting the sanitize strategy
    .useSanitizeValueStrategy('sanitizeParameters')
    .preferredLanguage(lang);
}
