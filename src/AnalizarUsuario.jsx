// C:\NexusBionic\nexus-frontend\src\AnalizarUsuario.jsx

import React, { useState } from 'react';
import axios from 'axios';

// Define la URL del backend usando una variable de entorno de Vite
// En desarrollo local, usará 'http://localhost:3000' (la URL de tu backend local Express).
// En Vercel, usará 'https://nexus-backend-vercel.vercel.app'.
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

const AnalizarUsuario = () => {
  const [formData, setFormData] = useState({
    edad: '',
    sexo: '',
    peso: '',
    altura: '',
    nivelActividad: '',
    objetivos: '',
    actividadesBasicas: [],
    actividadesInstrumentales: [],
    educacion: [],
    trabajo: [],
    juego: [],
    tiempoLibre: [],
    participacionSocial: [],
  });

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Maneja cambios en inputs de texto simples
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar el formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setResultado(null);

    // --- CAMBIO CLAVE AQUÍ ---
    // Tu backend de Vercel (`/api/analizarUsuario`) actualmente espera un objeto { texto: "..." }
    // En lugar de enviar todo el formData, vamos a concatenar los campos
    // relevantes en un solo string para el campo 'texto'.
    // Si tu backend en el futuro necesita todos estos campos por separado,
    // tendremos que modificar el backend para que los reciba.
    const textoParaAnalizar = `Edad: ${formData.edad}, Sexo: ${formData.sexo}, Peso: ${formData.peso}kg, Altura: ${formData.altura}cm, Nivel de Actividad: ${formData.nivelActividad}, Objetivos: ${formData.objetivos}.`;

    try {
      // Usamos la URL del backend definida arriba
      // y enviamos un objeto con la clave 'texto' como lo espera el backend.
      const response = await axios.post(
        `${BACKEND_API_URL}/api/analizarUsuario`,
        { texto: textoParaAnalizar } // Aquí enviamos el objeto con la clave 'texto'
      );

      setResultado(response.data);
    } catch (err) {
      // Mejor manejo del error para ver qué devuelve el backend
      if (err.response && err.response.data && err.response.data.mensaje) {
        setError(`Error del servidor: ${err.response.data.mensaje}`);
      } else {
        setError('Error al comunicarse con el servidor. Verifica la consola para más detalles.');
      }
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Analizar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
        />

        <label>Sexo (M/F):</label>
        <input
          type="text"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
        />

        <label>Peso (kg):</label>
        <input
          type="number"
          step="0.1"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          required
        />

        <label>Altura (cm):</label>
        <input
          type="number"
          step="0.1"
          name="altura"
          value={formData.altura}
          onChange={handleChange}
          required
        />

        <label>Nivel de actividad:</label>
        <input
          type="text"
          name="nivelActividad"
          value={formData.nivelActividad}
          onChange={handleChange}
          required
        />

        <label>Objetivos:</label>
        <input
          type="text"
          name="objetivos"
          value={formData.objetivos}
          onChange={handleChange}
          required
        />

        {/* Para simplificar, dejamos los arreglos vacíos por ahora */}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Analizando...' : 'Enviar'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalizarUsuario;