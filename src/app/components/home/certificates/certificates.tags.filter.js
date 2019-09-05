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

