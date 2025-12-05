const info = (...rest) => {
  if (!process.env.NODE_ENV === "test") {
    console.log(...rest);
  }
};

const error = (...rest) => {
if(!process.env.NODE_ENV === "test") {
  console.error(...rest)
}

};

module.exports = {
  info,
  error,
};
