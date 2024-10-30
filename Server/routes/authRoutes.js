const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();
const users = [{ id: 1, username: 'carlos', password:'123456', name: 'Carlos' }]; // Ejemplo

// Ruta para inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  console.log(req.body);
  // Verificar si el usuario existe y la contraseña es correcta
  if (!user || !((password=== user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  console.log(process.env.JWT_SECRET); // Verifica que este valor no sea undefined

  // Crear el token JWT con información del usuario
  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '5h' }
  );

  res.json({ token, user: { name: user.name } });
});

// Ruta para registro (opcional, si deseas añadir usuarios)
router.post('/register', async (req, res) => {
  const { username, password, name} = req.body;
  
  // Crear y almacenar el nuevo usuario
  const user = { id: users.length + 1, username, password: password, name };
  users.push(user);

  res.status(201).json({ message: 'Usuario registrado', user: { id: user.id, name } });
});

module.exports = router;
