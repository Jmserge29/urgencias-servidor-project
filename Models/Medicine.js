import { Schema, model } from "mongoose";

const schemaMedicine = Schema([
  {
    codigo: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    existenica: {
        type: Number,
        require: true
    },
    farmaceutica: {
        type: String,
        require: true
    },
    frecuencia: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        enum: [
            'Analgesicos',
            'Antiácido',
            'Antipiréticos',
            'Antiinflamatorios',
            'Antibióticos',
            'Antivirales',
            'Antihistamínicos',
            'Broncodilatadores',
            'Antihipertensivos',
            'Anticoagulantes',
            'Antidiabéticos',
            'Anticonceptivos',
            'Purgantes o laxantes',
            'Sedantes o ansiolíticos',
            'Vitaminas y suplementos',
            'Vacunas',
          ],
        require: true
    }

  },
]);
export default model("Medicine", schemaMedicine)