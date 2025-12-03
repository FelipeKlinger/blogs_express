const reverse = (string) => {
  return string.split("").reverse().join(""); // splits hace un array de caracteres, reverse invierte el array y join une el array en un string
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
