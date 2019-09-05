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

