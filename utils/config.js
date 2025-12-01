require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MOGOODB_URI = process.env.MOGOODB_URI;

module.exports = {
  MOGOODB_URI,
  PORT,
};
