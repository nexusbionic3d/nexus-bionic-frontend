// C:\NexusBionic\nexus-frontend\src\AnalizarUsuario.jsx

import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

const AnalizarUsuario = () => {
  // Solo un estado para el texto de la consulta
  const [motivoConsulta, setMotivoConsulta] = useState('');

  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = e => {
    setMotivoConsulta(e.target.value); // Captura directamente el valor del textarea
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setResultado(null);

    // Asegúrate de que el texto no esté vacío
    if (!motivoConsulta.trim()) {
      setError('Por favor, ingresa tu motivo de consulta.');
      setCargando(false);
      return;
    }

    try {
      // Envía el texto de la caja de chat bajo la clave 'texto'
      const response = await axios.post(
        `${BACKEND_API_URL}/api/analizarUsuario`,
        { texto: motivoConsulta } // El backend espera { texto: "..." }
      );

      setResultado(response.data);
    } catch (err) {
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
      <h1>Nexus Bionic - Análisis de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="motivoConsulta">Ingrese su motivo de consulta</label>
        <textarea
          id="motivoConsulta"
          name="motivoConsulta"
          value={motivoConsulta}
          onChange={handleChange}
          rows="4"
          cols="50"
          placeholder="Ej: Hola me duele la panza"
          required
        ></textarea>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Analizando...' : 'Analizar'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <h2>Resultado del Análisis</h2>
          <p><strong>Mensaje:</strong> {resultado.mensaje}</p>
          <p><strong>Resumen:</strong> {resultado.resumen}</p>
          <p><strong>Fecha del análisis:</strong> {new Date(resultado.fecha).toLocaleString()}</p>
        </div>
      )}
      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8em', color: '#666' }}>
        © 2025 Nexus Bionic. Todos los derechos reservados.
      </p>
    </div>
  );
};

export default AnalizarUsuario;