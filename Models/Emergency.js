import { Schema, model } from "mongoose";

const schemaEmergency = Schema(
  {
    hora: {
      type: String,
      required: true,
    },
    doctorAsignado: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicamentosRecetados: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
    motivos_consulta: {
      type: String,
      required: true,
    },
    tratamiento: {
      type: String,
      required: false,
    },
    clasificacion: {
      type: String,
      enum: ["Sin atender", "Admitido a Urgencias", "Dado de Alta con Tratamiento", "Dado de Alta con Cita Prioritaria"],
      default: "Sin atender",
      required: true,
    },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);
export default model("Emergency", schemaEmergency)