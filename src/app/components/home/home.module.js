import { certificates } from './certificates/certificates.module';
import { certificateSingle } from './certificate/certificate.module';
import { certificateTag } from './certificate-tag/certificate-tag.module';
import { CertificateService } from './certificate.service';

export const home = angular
  .module('components.home', [
    certificates,
    certificateSingle,
    certificateTag,
  ])
  .service('CertificateService', CertificateService)
  .name;

