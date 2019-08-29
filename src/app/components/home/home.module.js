import { certificates } from './certificates/certificates.module';
import { certificateSingle } from './certificate/certificate.module';
import { certificateTag } from './certificate-tag/certificate-tag.module';
import { CertificateService } from './certificate.service';
import angularSanitize from 'angular-sanitize';
import angularAnimate from 'angular-animate';

export const home = angular
  .module('components.home', [
    certificateSingle,
    certificates,
    certificateTag,
    angularSanitize,
    angularAnimate,
  ])
  .service('CertificateService', CertificateService)
  .name;

