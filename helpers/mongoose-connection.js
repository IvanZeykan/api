const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err) {
      if (err) console.log(err);
    }
  );
  console.log("mongoose connection started");
};
