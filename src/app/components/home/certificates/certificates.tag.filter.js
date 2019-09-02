export function certificateTagsFilter() {
  return (certificates, ctrl) => {
    // input, tags, pager, pageSize, currentPage, allCertificates
    let hasTags = (!!ctrl.tags && !!ctrl.tags.length) || false;
    let hasInput = !!ctrl.search || false;
    let filtered = ctrl.allCertificates;
    if (hasTags) {
      filtered = tagsFilter(ctrl.allCertificates, tags);
    }
    if(hasInput) {
      filtered = inputFilter(filtered, ctrl.search);
    }
    ctrl.items = filtered;

    // ctrl.pager.init(filtered.length, ctrl.currentPage, ctrl.pageSize);
    // filtered = filtered.slice(
    //   pager.startIndex,
    //   pager.endIndex + 1
    // );
    // ctrl.currentPage = 1;

    return ctrl.sertificatesToShow;
  }
}

function tagsFilter(certificates, tags) {
  let filtered = [];
  let searchTagsNames = tags.map((tag) => tag.name);
  for(let i=0; i<certificates.length; i++){
    let isFits = true;
    let certificateTagsNames = certificates[i].tags.map((tag) => tag.name);
    for(let j=0; j<searchTagsNames.length; j++){
      if(!certificateTagsNames.includes(searchTagsNames[j])){
        isFits = false;
      }
    }
    if(isFits) {
      filtered.push(certificates[i]);
    }
  }
  return filtered;
}

function inputFilter(certificates, input) {
  input = input.toUpperCase();
  let filtered = [];
  for(let i=0; i<certificates.length; i++) {
    if(certificates[i].description.toUpperCase().includes(input)
      || certificates[i].cost.toString().toUpperCase().includes(input)
      || certificates[i].title.toUpperCase().includes(input)) {
      filtered.push(certificates[i]);
    }
  }
  return filtered;
}

