# SkyShip Express 

El proyecto está dividido en un backend robusto basado en capas (Node.js/Express) y un cliente enriquecido altamente interactivo (React/Vite).

---

## 1. Arquitectura y Estructura del Proyecto

### Backend (Node.js & Express)
El servidor implementa un patrón de arquitectura limpia dividida en capas independientes para asegurar la escalabilidad, la separación de conceptos y la facilidad de mantenimiento:


backend/
├── src/
│   ├── controllers/      # Lógica de negocio de la aplicación (Manejo de peticiones y respuestas)
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── contactController.js
│   │   └── shipmentController.js
│   ├── middleware/       # Interceptores HTTP (Protección de rutas, validación de JWT y roles)
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/           # Definición de esquemas de datos y persistencia con Mongoose
│   │   ├── ContactMessage.js
│   │   ├── Shipment.js
│   │   └── User.js
│   ├── routes/           # Mapeo de Endpoints y enrutamiento de la API REST
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── shipmentRoutes.js
│   └── index.js          # Inicialización del servidor, middlewares globales y bootstrap
├── package-lock.json
└── package.json


Frontend (React & Vite)
El cliente SPA se estructura de forma modular

frontend/
├── public/               # Recursos estáticos globales (imágenes, iconos, favicon)
│   ├── favicon.svg
│   ├── icons.svg
│   └── skayship.png
├── src/
│   ├── assets/           # Estilos específicos y media local compilable
│   ├── components/       # Componentes de interfaz reutilizables
│   ├── context/          # Estados globales de React (Autenticación y Sesión)
│   ├── pages/            # Vistas raíz vinculadas al enrutador
│   ├── utils/            # Helpers del sistema y configuración de clientes HTTP
│   ├── App.css
│   ├── App.jsx           # Enrutamiento principal del cliente
│   ├── index.css         # Estilos globales y variables de diseño
│   └── main.jsx          # Punto de entrada y montaje en el DOM real
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js        # Configuración del bundler de Vite
└── Procfile              # Archivo de procesos para despliegue dinámico en la nube

2. Decisiones Técnicas Fundamentales

a. Capa de Base de Datos 
(Mongoose y MongoDB Atlas)
Apertura de Red Global (0.0.0.0/0): Se configuró esta regla en MongoDB Atlas debido a que AWS Elastic Beanstalk (en su modalidad de capa gratuita) asigna direcciones IP públicas de manera dinámica a las instancias EC2 en cada despliegue, actualización o reinicio.

Parámetro { family: 4 } en Mongoose:Sin esta bandera en la cadena de conexión de Node.js, las llamadas entraban en un ciclo de reintentos infinitos, gatillando un timeout de 30 segundos que congelaba por completo el servido

b. Capa de Red Perimetral (Proxy Inverso con CloudFront)
Resolución del Mixed Content (Contenido Mixto): AWS Amplify despliega por defecto el Frontend bajo un protocolo seguro HTTPS se introdujo AWS CloudFront como un Proxy Inverso que recibe las solicitudes de los clientes de forma segura (HTTPS), y reenvía el tráfico internamente a Beanstalk a través del puerto 80.

c. Capa de Políticas de Enrutamiento (CloudFront Behaviors)
Dado que nuestra aplicación consume una API REST con datos transaccionales de logística dinámicos, se deshabilitó el caché por completo para asegurar que cada petición HTTP llegue al servidor Express

AllViewerExceptHostHeader: Se configuró esta política de reenvío para evitar que los mecanismos de filtrado de Amazon descartaran las peticiones de verificación OPTIONS (CORS preflight), las cabeceras de autorización (tokens JWT) o el cuerpo (body) de las solicitudes POST y PUT

d. Capa de CI/CD (AWS Amplify y Vite)
Durante el build automatizado en Amplify, se inyectó la variable VITE_API_URL apuntando al endpoint seguro de CloudFront


3. Instalación y Ejecución Local
Requisitos previos
Node.js v18 o superior instalado.

Instancia local o remota de MongoDB activa.

a. Configuración del Servidor (Backend)
Entra al directorio del backend e instala las dependencias:

Bash
cd backend
npm install
Crea un archivo .env en la raíz de la carpeta backend/ con las siguientes variables:


PORT=5000
MONGODB_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=tu_palabra_secreta_para_tokens

Ejecuta el servidor en entorno de desarrollo:

Bash
npm start
b. Configuración del Cliente (Frontend)
Muévete al directorio del frontend e instala los módulos de Node:

Bash
cd ../frontend
npm install
Crea un archivo .env en la raíz de la carpeta frontend/ para mapear el entorno local:

VITE_API_URL=http://localhost:5000

Inicia el servidor de desarrollo de Vite:
Bash
npm run dev
