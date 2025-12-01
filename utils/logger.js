const info = (...rest) => {
  console.log(...rest);
};

const error = (...rest) => {
  console.error(...rest);
};

module.exports = {
  info,
  error,
};
