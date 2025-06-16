# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


✅ README.md actualizado
markdown
Copiar
Editar
# Nexus Bionic – Frontend

Este es el frontend de **Nexus Bionic**, una plataforma tecnológica para el análisis personalizado de bienestar. Desarrollado en React con Vite.

---

## 🧠 Funcionalidad principal

El usuario ingresa un texto describiendo sus síntomas o situación actual, y el sistema analiza el contenido en cuatro dimensiones:

- Emocional
- Cognitiva
- Física
- Ocupacional

Los resultados se presentan en tiempo real utilizando inteligencia artificial.

---

## 🚀 Instrucciones para desarrolladores

### 1. Clonar el repositorio

```bash
git clone https://github.com/nexusbionic3d/nexus-bionic-frontend.git
cd nexus-bionic-frontend
2. Instalar dependencias
bash
Copiar
Editar
npm install
3. Ejecutar localmente
bash
Copiar
Editar
npm run dev
Esto levantará la aplicación en http://localhost:5173.

🌐 Conexión con el backend
Este frontend detecta automáticamente si está corriendo en entorno local o en producción, y redirige las solicitudes al backend correspondiente:

Entorno	URL del backend utilizado
Desarrollo	http://localhost:3000/api/analizarUsuario
Producción	https://nexus-backend-vercel.vercel.app/api/analizarUsuario

No es necesario crear un archivo .env para esta funcionalidad básica.
Si en el futuro deseas una URL personalizada, puedes definirla así:

Opcional: archivo .env
env
Copiar
Editar
VITE_API_URL=https://tu-backend-personalizado.com/api
Y dentro de tu código modificarías:

js
Copiar
Editar
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV
  ? 'http://localhost:3000/api'
  : 'https://nexus-backend-vercel.vercel.app/api');
🛠 Requisitos
Node.js 18+

npm 9+

📂 Estructura general
pgsql
Copiar
Editar
nexus-bionic-frontend/
├── public/
├── src/
│   ├── App.jsx
│   └── index.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
📦 Producción
Este proyecto está preparado para ser desplegado en Vercel.
Al hacer push en main, Vercel compilará y publicará automáticamente.

🧩 Autores y mantenimiento
Proyecto desarrollado por Nexus Bionic

© 2025 Nexus Bionic. Todos los derechos reservados.