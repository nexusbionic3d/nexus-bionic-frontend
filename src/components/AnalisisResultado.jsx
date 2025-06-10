import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AnalisisResultado() {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    sexo: '',
    peso: '',
    altura: '',
    nivelActividad: '',
    objetivos: '',
    motivoConsulta: ''
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const analizar = async () => {
    const idUsuario = uuidv4();

    const payload = {
      idUsuario,
      ...formData,
      edad: Number(formData.edad),
      peso: Number(formData.peso),
      altura: Number(formData.altura)
    };

    try {
      const response = await fetch('http://localhost:3000/api/analizarUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Error al analizar:', error);
      setResultado({ mensaje: 'Error al conectar con el backend.' });
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Nexus Bionic - Evaluación</h1>

      <label>Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label><br /><br />

      <label>Edad:
        <input type="number" name="edad" value={formData.edad} onChange={handleChange} />
      </label><br /><br />

      <label>Sexo:
        <select name="sexo" value={formData.sexo} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </label><br /><br />

      <label>Peso (kg):
        <input type="number" name="peso" value={formData.peso} onChange={handleChange} step="0.1" />
      </label><br /><br />

      <label>Altura (cm):
        <input type="number" name="altura" value={formData.altura} onChange={handleChange} step="0.1" />
      </label><br /><br />

      <label>Nivel de actividad:
        <select name="nivelActividad" value={formData.nivelActividad} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          <option value="bajo">Bajo</option>
          <option value="moderado">Moderado</option>
          <option value="alto">Alto</option>
        </select>
      </label><br /><br />

      <label>Objetivos:
        <input type="text" name="objetivos" value={formData.objetivos} onChange={handleChange} />
      </label><br /><br />

      <label>Motivo de consulta:
        <input type="text" name="motivoConsulta" value={formData.motivoConsulta} onChange={handleChange} />
      </label><br /><br />

      <button onClick={analizar}>Analizar</button>

      {resultado && (
        <div style={{ marginTop: '2rem', background: '#eee', padding: '1rem' }}>
          <h3>Resultado del análisis:</h3>
          <p><strong>Mensaje:</strong> {resultado.mensaje}</p>
          <p><strong>Resumen:</strong> {resultado.resumen}</p>
          <p><strong>Fecha del análisis:</strong> {new Date(resultado.fecha).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
