import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import Role from '../Models/Role.js'

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.find();
    return res.status(200).json({ usuarios });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para obtener un paciente por ID
const getUserById = async (req, res) => {
  try {    
    const usuario = await User.findById(req.params.id);
    console.log(usuario)
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    console.error("Error al obtener el paciente por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const signIn = async (req, res) => {
  try {
    const { identificacion, password } = req.body;
    // Buscar al usuario por su email en la base de datos
    const user = await User.findOne({ identificacion });
    
    if (!user) {
        return res.status(404).json({ error: `Credenciales Incorrectas ${identificacion} ${password}` });
    }

    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await User.comparePassword(password,user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: 24 * 60 * 60,
    }); 
    const perfil = await Role.findOne({_id: user.role})

    // Enviar el token en la respuesta
    return res.status(200).json({ token , user, perfil: perfil.role});
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const {
      picture,
      identificacion,
      email,
      password,
      nombre,
      apellido,
      edad,
      eps,
      telefono,
      role
    } = req.body;

    // Verificar si los campos requeridos están presentes en el cuerpo de la solicitud
    if (!identificacion || !nombre || !apellido || !email || !password || !edad || !telefono) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const usuarioExistente = await User.findOne({ identificacion });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un paciente con la misma identificación.' });
    }

    // Asegúrate de encriptar la contraseña antes de guardarla
    const passwordEncrypted = await User.encryptPassword(password);

    const userCreate = new User({
      picture: "https://lippianfamilydentistry.net/wp-content/uploads/2015/11/user-default.png",
      identificacion,
      email,
      password: passwordEncrypted,
      nombre,
      apellido,
      edad,
      telefono,
    });

    if(role){
      // Usuario es un doctor
      const rolesFound = await Role.find({ role: { $in: role } });
      userCreate.role = rolesFound.map((rol) => rol._id)
      userCreate.especialidad = ""
      userCreate.consultorio = ""
      userCreate.horario = ""
      userCreate.salario = ""
      userCreate.emergencias_asignadas = []
      userCreate.pacientes = []
    } else {
      // Usuario es un paciente
        const role = await Role.findOne({ role: 'user' })
        userCreate.role = [role._id]
        userCreate.emergencia_asignada= null,
        userCreate.eps = eps
        userCreate.antecedentesMedicos = ""
        userCreate.historialMedico = []
    }

    await userCreate.save();

    return res.status(201).json({ message: "usuario creado con éxito.", usuario: userCreate });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }

};









// Controlador para editar los datos de un paciente por ID
const editUserById = async (req, res) => {
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
const deleteUserById = async (req, res) => {
  try {
    const { pacienteId } = req.params; // Obtiene el ID del parámetro de la URL

    // Consulta la base de datos para encontrar el paciente por su ID y eliminarlo
    const paciente = await Patient.findByIdAndRemove(pacienteId);

    if (!paciente) {
      return res.status(404).json({ error: "user no encontrado." });
    }

    return res.status(200).json({ message: "user eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el user por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};



export default {
    getAllUsers,
    createUser,
    getUserById,
    editUserById,
    deleteUserById,
    signIn
}