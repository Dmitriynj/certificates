export function certificateInputFilter() {
  return (certificates, input) => {

    input = input.toUpperCase();
    return certificates.filter(certificate =>
      certificate.description.toUpperCase().includes(input)
      || certificate.cost.toString().toUpperCase().includes(input)
      || certificate.title.toUpperCase().includes(input)
    );
  }
}

export function myCertificatesFilter() {
  return (certificates, userCertificates) => {

    let userCertificatesIds = userCertificates.map((certificate) => certificate.id);
    return certificates.filter(certificate =>
      userCertificatesIds.includes(certificate.id)
    );
  }
}

export function certificateTagsFilter() {
  return (certificates, queryTags) => {

    let searchTagsNames = queryTags.map((tag) => tag.name);
    return certificates.filter(certificate => {
      let isFits = true;
      let certificateTagsNames = certificate.tags.map((tag) => tag.name);
      searchTagsNames.forEach(tagName => {
        if (!certificateTagsNames.includes(tagName)) {
          isFits = false;
        }
      });
      return isFits;
    });
  }
}


