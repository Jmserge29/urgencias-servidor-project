import Patient from "../Models/Patient.js";

// Controlador para crear un nuevo paciente
const createPatient = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      edad,
      eps,
      identificacion,
      genero,
      direccion,
      telefono,
      password,
    } = req.body;

    // Verificar si los campos requeridos están presentes en el cuerpo de la solicitud
    if (!nombre || !apellido) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const pacienteExistente = await Patient.findOne({ identificacion });

    if (pacienteExistente) {
      return res.status(400).json({ error: 'Ya existe un paciente con la misma identificación.' });
    }

    // Asegúrate de encriptar la contraseña antes de guardarla
    const passwordEncrypted = await Patient.encryptPassword(password);

    const nuevoPaciente = new Patient({
      picture: "https://lippianfamilydentistry.net/wp-content/uploads/2015/11/user-default.png",
      nombre,
      apellido,
      edad,
      eps,
      identificacion,
      genero,
      direccion,
      telefono,
      password: passwordEncrypted,
      antecedentesMedicos: "",
      emergencia_asignada: null,
      historialMedico: [],
    });

    await nuevoPaciente.save();

    return res.status(201).json({ message: "Paciente creado con éxito.", paciente: nuevoPaciente });
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }

};

// Controlador para obtener todos los pacientes
const getAllPatients = async (req, res) => {
  try {
    const pacientes = await Patient.find();
    return res.status(200).json({ pacientes });
  } catch (error) {
    console.error("Error al obtener los pacientes:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para obtener un paciente por ID
const getPatientById = async (req, res) => {
  try {
    const { pacienteId } = req.params; // Obtiene el ID del parámetro de la URL

    const paciente = await Patient.findById(pacienteId);

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    return res.status(200).json({ paciente });
  } catch (error) {
    console.error("Error al obtener el paciente por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para editar los datos de un paciente por ID
const editPatientById = async (req, res) => {
  try {
    const { pacienteId } = req.params; // Obtiene el ID del parámetro de la URL
    const {
      nombre,
      apellido,
      edad,
      genero,
      direccion,
      telefono,
      antecedentesMedicos,
    } = req.body;

    // Consulta la base de datos para encontrar el paciente por su ID y actualizar sus datos
    const paciente = await Patient.findByIdAndUpdate(
      pacienteId,
      {
        nombre,
        apellido,
        edad,
        genero,
        direccion,
        telefono,
        antecedentesMedicos,
      },
      { new: true } // Devuelve el paciente actualizado
    );

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    return res.status(200).json({ paciente });
  } catch (error) {
    console.error("Error al editar el paciente por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para eliminar un paciente por ID
const deletePatientById = async (req, res) => {
  try {
    const { pacienteId } = req.params; // Obtiene el ID del parámetro de la URL

    // Consulta la base de datos para encontrar el paciente por su ID y eliminarlo
    const paciente = await Patient.findByIdAndRemove(pacienteId);

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado." });
    }

    return res.status(200).json({ message: "Paciente eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el paciente por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const signPatient = async (req, res) => {
  try {
    const { identificacion, password } = req.body;
    // Buscar al doctor por su email en la base de datos
    const paciente = await Patient.findOne({ identificacion });
    
    if (!paciente) {
        return res.status(404).json({ error: "Credenciales Incorrectas" });
    }
    
    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await Patient.comparePassword(password, paciente.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: paciente._id }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: 24 * 60 * 60,
    });

    // Enviar el token en la respuesta
    return res.status(200).json({ token , paciente});
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};


export default {
    getAllPatients,
    createPatient,
    getPatientById,
    editPatientById,
    deletePatientById,
    signPatient
}