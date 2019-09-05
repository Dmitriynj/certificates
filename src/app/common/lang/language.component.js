export const languageComponent = {
  bindings: {
  },
  template: require('./language.html'),
  controller: class LanguageComponent {
    static $inject = ['$rootScope', '$translate'];

    constructor($rootScope, $translate) {
      this.$rootScope = $rootScope;
      this.$translate = $translate;
    }

    changeLanguage(lang) {
      this.$rootScope.lang = lang;
      this.$translate.use(lang);
    }
  }
};
