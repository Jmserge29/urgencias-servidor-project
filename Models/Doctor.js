import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
const doctorSchema = Schema([
    {
      picture: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },  
    nombre: {
            type: String,
            required: true,
          },
          apellido: {
            type: String,
            required: true,
          },
          especialidad: {
            type: String,
            required: true,
          },
          telefono: {
            type: String,
            required: true,
          },
          correo: {
            type: String,
            required: true,
            unique: true,
          },
          consultorio: {
            type: String,
            required: true,
          },
          horario: {
            type: String,
            required: true,
          },
          identificacion: {
            type: Number,
            required: true,
          },
          salario: {
            type: Number,
            required: true,
          },
          emergencias_asignadas: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Emergency',
            },
          ],
          pacientes: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Patient',
            },
          ]
    }
])

// Encrypt password the User
doctorSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Comparer Passwords the User
doctorSchema.statics.comparePassword = async (password, reveicedPassword) => {
  return await bcrypt.compare(password, reveicedPassword);
};

export default model("Doctor", doctorSchema)