import {certificateTagComponent} from "./certificate-tag.component";

export const certificateTag = angular
  .module('components.home.certificate-tag', [])
  .component('certificateTag', certificateTagComponent)
  .name;
