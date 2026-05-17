# Proyecto AeroPaq - Landing Page SPA en React

Una Single Page Application (SPA) para "AeroPaq", una empresa logística moderna de envíos nacionales e internacionales, desarrollada como proyecto universitario empleando bases profesionales de UI/UX, Componentización Modular, y Validaciones Dinámicas.

![AeroPaq Demo Interface](./public/logo.png)

## Tecnologías Utilizadas
- **React 18** (Estructura de Componentes Orientada a Hooks `useState`, Modularidad)
- **Vite** (Build Tool super veloz, HMR)
- **React Router DOM v6** (Manejo del App-Routing Client-Side sin recargas artificiales)
- **Lucide React** (Paquete de Iconografía vectorial ligera)
- **CSS3 Vanilla** con Variables de Root (Implementación de un sistema de diseño propio, Glassmorphism, CSS Grids expansivos).
- **Google Apps Script** (Endpoint Serverless para la recepción del formulario de Contacto)

##  Cumplimiento de Funcionalidades
1. **Página Principal (Landing)** construida con un concepto de módulos encadenados (Hero, Servicios, Cómo Funciona, Cobertura, Sobre Nosotros, FAQ y Contacto) usando Hash links y scroll súper suave (smooth scrolling).
2. **Formulario de Contacto Real:** Incluye validaciones síncronas as-you-type (Correos, Teléfonos, strings vacíos) y envía la información post-submit asincrónicamente a un Google Sheet vía macro, manejando estados de "Cargando", "Éxito" y "Error" visual.
3. **Página de Cotizador Independiente:** Emplea "React Router" montada en la ruta `/cotizador`. Un componente sumamente inteligente que acepta los parámetros físicos del paquete para desglosar el costo y tiempo de transporte en tiempo real.
4. **Cálculo de Cotización de Nivel Real (Peso Volumétrico):** El "Cerebro" de cotización separado en `/utils/pricing.js` detecta si el paquete tiene un "peso físico mayor que" o un "peso volumétrico equivalente mayor que" (fórmula L*A*A/5000), cobrando a la empresa de forma correcta como ocurriría en una aerolínea real.

##  Arquitectura del Proyecto React
El proyecto aplica el patrón de separación de responsabilidades:
```
/src
 ├── /assets           # (Imágenes dinámicas)
 ├── /components       # Componentes reusables UI puros, modulares
 │   ├── Navbar, Hero, ContactForm, Footer, About, FAQ, etc.
 ├── /pages            # Componentes vista (Routers)
 │   ├── Landing.jsx    
 │   ├── Calculator.jsx
 ├── /utils            # Funciones puras (No React), Lógica de negocio
 │   ├── pricing.js     # Matemáticas de Paquetería
 ├── App.jsx           # Entrypoint y Routing maestro
 ├── main.jsx          # Renderizado Root
```

##  Cómo Correr el Proyecto (Modo Desarrollo)

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu equipo.

1. Clona/Descarga el repositorio en tu máquina local y entra a la carpeta del proyecto.
2. Abre tu terminal.
3. Instala las dependencias del proyecto corriendo:
```bash
npm install
```
4. Levanta el servidor local de desarrollo corriendo:
```bash
npm run dev
```

Te proveerá una dirección en Localhost que puedes abrir en el navegador.

## 👤 Autor
Desarrollado para la clase de Programación Web de la *Universidad Rafael Landívar* (URL) - 2026.
Diego Azurdia - 1010821
Carlos Avila - 1119021