import { Truck, Globe, MapPin, Zap } from 'lucide-react';

const Services = () => {
  const servicesList = [
    { title: "Envíos Nacionales", desc: "Todo Guatemala en 24-48h.", icon: <MapPin size={32} color="var(--accent)" /> },
    { title: "Envíos Internacionales", desc: "Conexión directa con el mundo.", icon: <Globe size={32} color="var(--accent)" /> },
    { title: "Recolección a domicilio", desc: "No salgas de casa, nosotros vamos.", icon: <Truck size={32} color="var(--accent)" /> },
    { title: "Servicio Exprés", desc: "Entregas en horas, no días.", icon: <Zap size={32} color="var(--accent)" /> }
  ];
  return (
    <section id="servicios" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
      <div className="container">
        <div className="section-header">
          <h2>Nuestros Servicios</h2>
          <p>Soluciones a tu medida, garantizando que tus paquetes lleguen siempre a tiempo.</p>
        </div>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {servicesList.map((s, i) => (
            <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;