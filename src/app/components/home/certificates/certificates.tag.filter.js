export function certificateTagsFilter() {
  return (certificates, tags) => {
    let hasTags = (!!tags && !!tags.length) || false;
    if (hasTags) {
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
    return certificates;
  }
}
