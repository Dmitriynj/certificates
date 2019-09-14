export const languageComponent = {
  bindings: {
  },
  template: require('./language.html'),
  controller: class LanguageComponent {
    static $inject = ['$translate', '$localStorage'];

    constructor($translate, $localStorage) {
      this.$translate = $translate;
      this.$localStorage = $localStorage;
    }

    changeLanguage(lang) {
      this.$localStorage.globals.lang = lang;
      this.$translate.use(lang);
    }
  }
};
