/*
    Campos:
        name
        age
        email
        password
        phoneNumber
        isVerified
*/

import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    email: {
      type: Number,
      require: true,
      min: 0,
    },
    password: {
      type: Number,
      require: true,
      min: 8,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    isVerified:{
        type: Boolean,
        require: true,
        min: 8,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Patients", patientSchema);