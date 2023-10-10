import Emergency from '../Models/Emergency.js'
import Patient from '../Models/Patient.js'
import Doctor from '../Models/Doctor.js'
import moment from 'moment';
var time = moment().format('MMMM Do YYYY, h:mm:ss a');

export const createEmergency = async (req, res) => {
    try {
      // Validar los datos ingresados en el cuerpo de la solicitud (req.body)
      const { doctorId, pacienteId, motivos_consulta } = req.body;
  
      if (!doctorId || !pacienteId) {
        return res.status(400).json({ error: 'Se requieren los IDs del doctor y el paciente.' });
      }
  
      // Verificar si el doctor y el paciente existen en la base de datos
      const doctor = await Doctor.findById(doctorId);
      const paciente = await Patient.findById(pacienteId);
  
      if (!doctor || !paciente) {
        return res.status(404).json({ error: 'Doctor o paciente no encontrado.' });
      }
  
      // Crear una nueva instancia de emergencia
      const nuevaEmergencia = new Emergency({
        doctorAsignado: doctorId,
        paciente: pacienteId,
        
        ...restoDatos,
        estado: 'Sin atender', // Estado inicial
      });
  
      // Guardar la emergencia en la base de datos
      await nuevaEmergencia.save();
  
      // Asignar la emergencia al doctor y al paciente
      doctor.emergencias.push(nuevaEmergencia);
      paciente.emergencias.push(nuevaEmergencia);
  
      await doctor.save();
      await paciente.save();
  
      return res.status(201).json({ message: 'Emergencia creada con éxito.', emergencia: nuevaEmergencia });
    } catch (error) {
      console.error('Error al crear la emergencia:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };