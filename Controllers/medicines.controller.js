import Medicine from "../Models/Medicine.js"

const getMedicinesAlls = async(req, res) => {
    try {
        const medicines = await Medicine.find();
    
        return res.status(200).json(medicines);
      } catch (error) {
        return res
          .status(500)
          .json({
            error: "Error al obtener las medicinas",
            details: error.message,
          });
      }
}

const getMedicineById = async(req, res) => {
    try {
        const medicineId = req.params.id; 
        const medicine = await Medicine.findById(medicineId);
        console.log(medicine)
    
        if (!medicine) {
          return res.status(404).json({ error: 'Medicina no encontrada' });
        }
        return res.status(200).json(medicine);
      } catch (error) {
        return res.status(500).json({ error: 'Error al buscar la Medicina por ID', details: error.message });
      }
}

const getMedicinesByCategory = async(req, res) => {
    try {
        const medicineCategory = req.params.category; 
        const medicines = await Medicine.find({categoria : medicineCategory});
        console.log(medicines)
    
        if (!medicines) {
          return res.status(404).json({ error: 'Medicinas no encontrada' });
        }
        return res.status(200).json(medicines);
      } catch (error) {
        return res.status(500).json({ error: 'Error al buscar la Medicinas por ID', details: error.message });
      }
}

export default {
    getMedicineById,
    getMedicinesAlls, 
    getMedicinesByCategory
}