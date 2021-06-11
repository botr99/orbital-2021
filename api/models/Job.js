import mongoose from 'mongoose';
// const Registration = require("./Registration");
import { categories } from '../seeds/seedHelpers.js'; // To provide default categories
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    organizer: {
      type: String,
      required: true,
    },
    // registerID: {
    //   type: String,
    //   // required: true,
    // },
    contact: {
      type: Number,
      maxlength: 8,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    categories: {
      type: [{ type: String, enum: categories }], // allow for multiple categories
      required: true,
    },
    duration: {
      start: {
        type: Date,
        // required: true,
      },
      end: {
        type: Date,
        // required: true,
      },
      hours: {
        type: Number,
        // required: true,
      },
    },
    // registrations: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Registration",
    //   },
    // ],
  },
  { timestamps: true } // assigns createdAt and updatedAt fields to the schema
);

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

const Job = mongoose.model('Job', jobSchema);
export default Job;
