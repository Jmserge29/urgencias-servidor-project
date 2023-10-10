import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const patientSchema = Schema(
  {
    picture: {
      type: String,
      required: true,
    },
    emergencia_asignada: {
      type: Schema.Types.ObjectId,
      ref: "Emergency",
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
    eps: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      enum: ["Masculino", "Femenino", "Otro"],
      required: true,
    },
    identificacion: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: false,
    },
    telefono: {
      type: String,
      required: true,
    },
    antecedentesMedicos: {
      type: String,
      required: false,
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
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

// Encrypt password the User
patientSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Comparer Passwords the User
patientSchema.statics.comparePassword = async (password, reveicedPassword) => {
  return await bcrypt.compare(password, reveicedPassword);
};

export default model("Patient", patientSchema);
