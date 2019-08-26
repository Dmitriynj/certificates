export class CertificateService {
  constructor($rootScope) {
    'ngInject'

    this.$rootScope = $rootScope;
    this.$rootScope.globals = {
      certificates:  [
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
        {
          title: 'Some name',
          description: 'Description',
          date: new Date(2020, 9),
          cost: 100
        },
      ]
    }
  }

  getCertificatesList() {
    return this.$rootScope.globals.certificates;
  }


}
