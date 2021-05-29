const mongoose = require("mongoose");
// const Registration = require("./registration");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  organizer: {
    type: String,
    required: true,
  },
  // registerID: {
  //   type: String,
  //   // required: true,
  // },
  // contact: {
  //   type: Number,
  //   maxlength: 8,
  //   // required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: []
  },
  // duration: {
  //   start: {
  //     type: Date,
  //     // required: true,
  //   },
  //   end: {
  //     type: Date,
  //     // required: true,
  //   },
  //   hours: {
  //     type: Number,
  //     // required: true,
  //   },
  // },
  // registrations: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Registration",
  //   },
  // ],
});

// Middleware to delete from registrations database
// jobSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await Registration.deleteMany({
//       _id: {
//         $in: doc.registrations,
//       },
//     });
//   }
// });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
