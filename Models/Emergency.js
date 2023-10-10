import { Schema, model } from "mongoose";

const schemaEmergency = Schema([
  {
    hora: {
      type: Date,
      required: true,
      default: Date.now,
    },
    doctorAsignado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
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
      enum: ["Sin atender", "Doctor asignado", "En consulta", "Atendido"],
    }
  },
]);
export default model("Emergency", schemaEmergency)