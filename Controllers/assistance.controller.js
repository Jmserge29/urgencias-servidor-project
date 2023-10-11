import Assistance from "../Models/Assistance.js";
import jwt from "jsonwebtoken";

const signInAssistance = async (req, res) => {
  try {
    const { correo, password } = req.body;
    console.log(correo, password)
    // Buscar al assistance por su email en la base de datos
    const assistance = await Assistance.findOne({ correo });
    
    if (!assistance) {
        return res.status(404).json({ error: "Credenciales Incorrectas" });
    }
    
    // Verificar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await Assistance.comparePassword(password, assistance.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: assistance._id }, process.env.SECRET_KEY_TOKEN, {
      expiresIn: 24 * 60 * 60,
    });

    // Enviar el token en la respuesta
    return res.status(200).json({ token , assistance});
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export default {
  signInAssistance,
};