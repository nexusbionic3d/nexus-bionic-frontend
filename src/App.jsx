import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/X.png'; // Asegurate que X.png esté en src/assets

export default function App() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');
  const [historial, setHistorial] = useState([]);

  const MAX_LENGTH = 500;
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let id = localStorage.getItem('usuarioId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('usuarioId', id);
    }
    setUsuarioId(id);
  }, []);

  useEffect(() => {
    if (usuarioId && API_BASE_URL) {
      obtenerHistorial();
    }
  }, [usuarioId]);

  const obtenerHistorial = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/consultarHistorial?usuarioId=${usuarioId}`);
      setHistorial(response.data.historial || []);
    } catch (err) {
      console.error('Error al cargar historial:', err);
    }
  };

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

    if (!API_BASE_URL) {
      setError('No se ha definido la URL del backend (VITE_API_URL).');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/analizarUsuario`,
        { texto: textoTrim, usuarioId }
      );

      setResultado(response.data);
      setTexto('');
      obtenerHistorial();
    } catch (e) {
      setError('Error al comunicarse con el servidor.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Cabinet Grotesk Variable, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: 30 }}>
        <img src={logo} alt="Nexus Bionic Logo" style={{ width: 80, height: 'auto', marginBottom: 10 }} />
        <h1 style={{ fontSize: 28, color: '#1D4ED8' }}>Nexus Bionic</h1>
        <p style={{ fontSize: 16, color: '#4B5563' }}>Plataforma Terapéutica Inteligente</p>
      </header>

      <p>Ingrese su motivo de consulta</p>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Describa sus síntomas o molestias aquí..."
        maxLength={MAX_LENGTH}
        aria-label="Motivo de consulta"
        disabled={loading}
        style={{ width: '100%', height: 120, fontSize: 16, padding: 8, marginBottom: 10 }}
      ></textarea>

      <button
        onClick={analizarTexto}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Analizando...' : 'Analizar'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '0.8rem' }}>{error}</p>}

      {resultado && (
        <section className="resultado" aria-live="polite" style={{ marginTop: 20 }}>
          <h2>Resultado del Análisis</h2>
          <p><strong>Mensaje:</strong> {resultado.mensaje}</p>
          <p><strong>Resumen:</strong> {resultado.resumen}</p>
          <p><strong>Fecha del análisis:</strong> {new Date(resultado.fecha).toLocaleString()}</p>
        </section>
      )}

      {historial.length > 0 && (
        <section style={{ marginTop: 40 }}>
          <h2>Historial de Análisis</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {historial
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map((item) => (
                <li key={item.id} style={{ marginBottom: 15, padding: 10, border: '1px solid #ddd', borderRadius: 6 }}>
                  <p><strong>Fecha:</strong> {new Date(item.fecha).toLocaleString()}</p>
                  <p><strong>Texto ingresado:</strong> {item.texto}</p>
                  <p><strong>Resumen:</strong> {item.resultado?.resumen}</p>
                </li>
              ))}
          </ul>
        </section>
      )}

      <footer style={{ marginTop: 40, fontSize: 12, color: '#666' }}>
        © 2025 Nexus Bionic. Todos los derechos reservados.
      </footer>
    </div>
  );
}
