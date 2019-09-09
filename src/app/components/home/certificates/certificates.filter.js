export function certificateInputFilter() {
  return (certificates, input) => {

    input = input.toUpperCase();
    let filtered = [];
    for (let i = 0; i < certificates.length; i++) {
      if (certificates[i].description.toUpperCase().includes(input)
        || certificates[i].cost.toString().toUpperCase().includes(input)
        || certificates[i].title.toUpperCase().includes(input)) {
        filtered.push(certificates[i]);
      }
    }
    return filtered;
  }
}

export function myCertificatesFilter() {
  return (certificates, userCertificates) => {

    let userCertificatesIds = userCertificates.map((certificate) => certificate.id);
    let filtered = [];
    for (let i = 0; i < certificates.length; i++) {
      if (userCertificatesIds.includes(certificates[i].id)) {
        filtered.push(certificates[i]);
      }
    }
    return filtered;
  }
}

export function certificateTagsFilter() {
  return (certificates, queryTags) => {

    let filtered = [];
    let searchTagsNames = queryTags.map((tag) => tag.name);
    for (let i = 0; i < certificates.length; i++) {
      let isFits = true;
      let certificateTagsNames = certificates[i].tags.map((tag) => tag.name);
      for (let j = 0; j < searchTagsNames.length; j++) {
        if (!certificateTagsNames.includes(searchTagsNames[j])) {
          isFits = false;
        }
      }
      if (isFits) {
        filtered.push(certificates[i]);
      }
    }
    return filtered;
  }
}


