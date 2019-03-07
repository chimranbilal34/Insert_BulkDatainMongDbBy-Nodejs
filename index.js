var delay = require('delay');
var Queue = require('better-queue');
var mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Testdata", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb Connect");
  });
const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  phone: String,
  title: String,
  age: Number,
  names: [
    {
      name: String,
      src: String
    }
  ],
  location: String
});
var Test = mongoose.model("testing", schema);
var a = 0;
async function Insertdata() {
  await delay(2000)
  var ages = new Queue(function (batch, cb) {
    var newUser = new Test(batch);
    newUser.save().then((err, data) => {
      cb("Save.....:" + a);
      //  console.log()
    })

  })
  for (var i = 1; i < 200000; i++) {
    await delay(50)
    a++;
    console.log("..............:" + a)
    var data = {
      _id: new mongoose.Types.ObjectId(),
      phone: "0000" + a,
      title: "Insert Data in MongoDb",
      age: a,
      names: [{
        name: a,
        src: "Test :" + a
      }],
      location: "Lahore"
    }
    ages.push(data, (data => {
      console.log(data)
    }))
  }
}


Insertdata()