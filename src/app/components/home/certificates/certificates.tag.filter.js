export function certificateTagsFilter() {
  return (certificates, input, tags, pager, pageSize, currentPage, allCertificates) => {
    let hasTags = (!!tags && !!tags.length) || false;
    let hasInput = !!input || false;
    let filtered = allCertificates;
    if (hasTags) {
      filtered = tagsFilter(allCertificates, tags);
    }
    if(hasInput) {
      filtered = inputFilter(filtered, input);
    }

    pager.init(filtered.length, currentPage, pageSize);
    filtered = filtered.slice(
      pager.startIndex,
      pager.endIndex + 1
    );
    currentPage = 1;
    return filtered;
  }
}

function tagsFilter(certificates, tags) {
  let filtered = [];
  for(let i=0; i<certificates.length; i++){
    let isFits = true;
    for(let j=0; j<tags.length; j++){
      if(!certificates[i].tags.includes(tags[j])){
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

