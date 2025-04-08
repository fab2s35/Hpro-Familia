/*
    Campos:
        name
        specialty
        email
        password
*/

import { Schema, model } from "mongoose";

const doctorsSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    specialty: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: {
      type: Number,
      require: true,
    },

  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Doctors", doctorsSchema);