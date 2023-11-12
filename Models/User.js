import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = Schema([
  {
    // Propiedades Básicas Usurio
    picture: {
      type: String,
      required: true,
    },
    identificacion: {
      type: Number,
      required: true,
    },
    email: {
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
    edad: {
      type: Number,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    // Propiedades de Paciente
    emergencia_asignada: {
      type: Schema.Types.ObjectId,
      ref: "Emergency",
    },
    eps: {
      type: String,
    },
    historialMedico: [
      {
        fecha: {
          type: Date,
          required: true,
        },
        motivoConsulta: {
          type: String,
          required: true,
        },
        diagnostico: {
          type: String,
          required: true,
        },
        tratamiento: {
          type: String,
          required: true,
        },
      },
    ],
    // Propiedades de Doctor
    especialidad: {
      type: String,
    },
    consultorio: {
      type: String,
    },
    horario: {
      type: String,
    },
    salario: {
      type: Number,
    },
    emergencias_asignadas: [
      {
        type: Schema.Types.ObjectId,
        ref: "Emergency",
      },
    ],
    pacientes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
]);

// Encrypt password the User
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Comparer Passwords the User
userSchema.statics.comparePassword = async (password, reveicedPassword) => {
  return await bcrypt.compare(password, reveicedPassword);
};

export default model("User", userSchema);
