import React, { useState } from 'react';
import axios from 'axios';

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

    try {
      // Llamada POST a la función cloud local
      const response = await axios.post(
        'http://127.0.0.1:5001/nexus-bionic/us-central1/analizarUsuario',
        formData
      );

      setResultado(response.data);
    } catch (err) {
      setError('Error al comunicarse con el servidor.');
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
