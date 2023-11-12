import { Schema, model } from "mongoose";

const schemaEmergency = Schema([
  {
    hora: {
      type: Date,
      required: true,
      default: Date.now,
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
]);
export default model("Emergency", schemaEmergency)