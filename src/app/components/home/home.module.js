import { certificateSingle } from './certificate/certificate.module';
import { CertificateService } from './certificate.service';

export const home = angular
  .module('components.home', [
    certificateSingle

  ])
  .service('CertificateService', CertificateService)
  .name;

