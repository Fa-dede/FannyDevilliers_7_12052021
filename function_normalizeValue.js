const normalizeValues = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const sortByAlphabeticsOrder = (array) => {
  array = array.sort((a, b) => {
    return a > b ? 1 : -1;
  });
};

export { normalizeValues, sortByAlphabeticsOrder };
