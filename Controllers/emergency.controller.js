import Emergency from '../Models/Emergency.js'
import Patient from '../Models/Patient.js'

const createEmergency = async (req, res) => {
    try {
      // Validar los datos ingresados en el cuerpo de la solicitud (req.body)
      const { pacienteId, motivos_consulta } = req.body;
  
      if (!motivos_consulta || !pacienteId) {
        return res.status(400).json({ error: 'Se requieren los IDs del doctor y el paciente.' });
      }
  
      const paciente = await Patient.findById(pacienteId);
  
      if ( !paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado.' });
      }
  
      // Crear una nueva instancia de emergencia
      const nuevaEmergencia = new Emergency({
        doctorAsignado: null,
        paciente: pacienteId,
        recomendaciones: "",
        medicamentosRecetados: "",
        motivos_consulta: motivos_consulta,
        tratamiento: "",
        clasificacion: "PD",
        estado: 'Sin atender', // Estado inicial
      });
  
      // Guardar la emergencia en la base de datos
      await nuevaEmergencia.save();
  
      // Asignar la emergencia al doctor y al paciente
      paciente.emergencia_asignada =nuevaEmergencia;
  
      await paciente.save();
  
      return res.status(201).json({ message: 'Emergencia creada con éxito.', emergencia: nuevaEmergencia });
    } catch (error) {
      console.error('Error al crear la emergencia:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };

  const getAllEmergencies = async (req, res) => {
    try {
      const emergencies = await Emergency.find();
  
      return res.status(200).json(emergencies);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener las emergencias', details: error.message });
    }
  };

  const getAllUnattendedEmergencies = async (req, res) => {
    try {
      const unattendedEmergencies = await Emergency.find({ estado: 'Sin atender' });
  
      return res.status(200).json(unattendedEmergencies);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener las emergencias sin atender', details: error.message });
    }
  };

  export default {
    createEmergency,
    getAllEmergencies,
    getAllUnattendedEmergencies
  }