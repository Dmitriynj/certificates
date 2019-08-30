import { certificates } from './certificates/certificates.module';
import { certificateSingle } from './certificate/certificate.module';
import { certificateEditForm } from './certificate-edit-form/certifiate-edit-form.module';
import { certificateEdit } from './certificate-edit/certificate-edit.module';
import { certificateTag } from './certificate-tag/certificate-tag.module';
import { CertificateService } from './certificate.service';

export const home = angular
  .module('components.home', [
    certificates,
    certificateSingle,
    certificateEditForm,
    certificateEdit,
    certificateTag,
  ])
  .service('CertificateService', CertificateService)
  .name;

