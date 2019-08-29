export class CertificateService {
  constructor($rootScope, $q, $timeout) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$timeout = $timeout;
    this.$rootScope.globals = {
      certificates:  [
        {
          title: 'Lorem ipsum',
          description: 'Description',
          date: new Date(2020, 9, 4, 12, 30, 0, 0),
          cost: 100,
          tags: [
            '1', '2', '3'
          ]
        },
        {
          title: 'Dolor sit',
          description: 'Description',
          date: new Date(2020, 7, 5, 27, 0, 0),
          cost: 100,
          tags: [
            '3',
          ]
        },
        {
          title: 'Consectetur adipiscing',
          description: 'Description',
          date: new Date(2020, 4, 5, 12, 7, 0,0),
          cost: 100, $rootScope,
          tags: [
            '2'
          ]
        },
        {
          title: 'Fusce tempor',
          description: 'Description',
          date: new Date(2020, 9, 7, 8, 5, 0, 0),
          cost: 100,
          tags: [
            '1'
          ]
        },
        {
          title: 'Consectetur',
          description: 'Description',
          date: new Date(2020, 1, 5 , 3, 1, 0, 0,),
          cost: 100,
          tags: [
            '1'
          ]
        },
        {
          title: 'Adipiscing',
          description: 'Description',
          date: new Date(2020, 5, 4, 6,7 ,0,0),
          cost: 100,
          tags: [
            '1'
          ]
        },
      ]
    }
  }


  getCertificatesList() {
    return this.$rootScope.globals.certificates;
  }


}
