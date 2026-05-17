import { Link } from 'react-router-dom';

const Hero = () => (
  <header className="hero">
    <div className="container fade-in">
      <h1>Logística que mueve tus sueños</h1>
      <p>Envíos nacionales e internacionales con la rapidez y seguridad que mereces.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="#servicios" className="btn-secondary" style={{ backgroundColor: 'white' }}>Ver Servicios</a>
        <Link to="/cotizador" className="btn-primary">Cotizar Envío</Link>
      </div>
    </div>
  </header>
);

export default Hero;