import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');

  const MAX_LENGTH = 500;

  // Al cargar el componente, generar o recuperar el usuarioId
  useEffect(() => {
    let id = localStorage.getItem('usuarioId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('usuarioId', id);
    }
    setUsuarioId(id);
  }, []);

  const analizarTexto = async () => {
    setError('');
    setResultado(null);

    const textoTrim = texto.trim();

    if (!textoTrim) {
      setError('Por favor ingrese su motivo de consulta.');
      return;
    }

    if (textoTrim.length < 5) {
      setError('El texto debe tener al menos 5 caracteres.');
      return;
    }

    if (textoTrim.length > MAX_LENGTH) {
      setError(`El texto no puede exceder los ${MAX_LENGTH} caracteres.`);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://nexus-backend-vercel.vercel.app/api/analizarUsuario', // ¡URL DEL BACKEND CORREGIDA!
        { texto: textoTrim, usuarioId }  // Enviamos el usuarioId junto al texto
      );
      setResultado(response.data);
    } catch (e) {
      setError('Error al comunicarse con el servidor.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Nexus Bionic - Análisis de Usuario</h1>
      <p>Ingrese su motivo de consulta</p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Describa sus síntomas o molestias aquí..."
        maxLength={MAX_LENGTH}
        aria-label="Motivo de consulta"
        disabled={loading}
      ></textarea>

      <button onClick={analizarTexto} disabled={loading}>
        {loading ? 'Analizando...' : 'Analizar'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '0.8rem' }}>{error}</p>}

      {resultado && (
        <section className="resultado" aria-live="polite">
          <h2>Resultado del Análisis</h2>
          <p><strong>Mensaje:</strong> {resultado.mensaje}</p>
          <p><strong>Resumen:</strong> {resultado.resumen}</p>
          <p><strong>Fecha del análisis:</strong> {new Date(resultado.fecha).toLocaleString()}</p>
        </section>
      )}

      <footer>© 2025 Nexus Bionic. Todos los derechos reservados.</footer>
    </div>
  );
}