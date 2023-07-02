const mongoose = require("mongoose");
const database_uri = `mongodb://localhost:27017/crypto`;

const connectToDatabase = async () => {
  await mongoose.connect(database_uri);
  console.log(`Database connected Successfully`);
};

module.exports = connectToDatabase;
