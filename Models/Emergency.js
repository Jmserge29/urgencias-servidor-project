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
      ref: "Doctor",
    },
    paciente: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    recomendaciones: {
      type: String,
      required: false,
    },
    medicamentosRecetados: {
      type: String,
      required: false,
    },
    motivos_consulta: {
      type: String,
      required: true,
    },
    tratamiento: {
      type: String,
      required: false,
    },
    estado: {
      type: String,
      enum: ["Sin atender", "Doctor asignado", "En consulta", "Atendido"],
      default: "Sin atender",
      required: true,
    },
    clasificacion: {
      type: String,
      enum: ["A", "B1", "B2", "C1", "C2", "PD"],
    }
  },
]);
export default model("Emergency", schemaEmergency)