import { certificates } from './certificates/certificates.module';
import { certificateSingle } from './certificate/certificate.module';
import { certificateEditForm } from './certificate-form/certifiate-form.module';
import { certificateAdd } from './certificate-add/certificate-add.module';
import { certificateEdit } from "./certificate-edit/certificate-edit.module";
import { certificateTag } from './certificate-tag/certificate-tag.module';
import { CertificateService } from './certificate.service';

export const home = angular
  .module('components.home', [
    certificates,
    certificateSingle,
    certificateEditForm,
    certificateEdit,
    certificateAdd,
    certificateTag,
  ])
  .service('CertificateService', CertificateService)
  .name;

