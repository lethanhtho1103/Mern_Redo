const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mern_redo");
    console.log("Connect MongoDB successfully!");
  } catch (error) {
    console.log("Connect Failure!");
  }
}

module.exports = { connect };
