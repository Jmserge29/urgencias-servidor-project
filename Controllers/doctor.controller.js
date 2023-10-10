import Doctor from "../Models/Doctor.js";
import jwt from "jsonwebtoken";

const signInDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al doctor por su email en la base de datos
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor no encontrado." });
    }

    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await doctor.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: doctor._id }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: 24*60*60,
    });

    // Enviar el token en la respuesta
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export default {
  signInDoctor,
};
