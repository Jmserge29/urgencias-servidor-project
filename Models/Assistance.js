import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const assistanceSchema = new Schema({
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    identificacion: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salario: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    turno: {
      type: String,
    },
  });

  // Encrypt password the User
assistanceSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Comparer Passwords the User
assistanceSchema.statics.comparePassword = async (password, reveicedPassword) => {
  return await bcrypt.compare(password, reveicedPassword);
};


  export default model("Assistance", assistanceSchema)