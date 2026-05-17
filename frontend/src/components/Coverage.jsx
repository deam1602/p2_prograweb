import React from 'react';
import { Map, Plane, CheckCircle2 } from 'lucide-react';

const Coverage = () => (
  <section id="cobertura" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
    <div className="container">
      <div className="section-header">
        <h2>Cobertura Total</h2>
        <p>Operamos en los 22 departamentos de Guatemala y más de 50 países alrededor del mundo.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Map size={48} color="var(--primary)" />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Nacional</h3>
          <p style={{ color: 'var(--text-muted)' }}>Llegamos a cada rincón del país con rutas diarias y tiempos de entrega garantizados.</p>
        </div>

        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Plane size={48} color="var(--primary)" />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Internacional</h3>
          <p style={{ color: 'var(--text-muted)' }}>Alianzas estratégicas para llevar tus paquetes de forma rápida y segura a cualquier continente.</p>
        </div>
        
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={48} color="var(--primary)" />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>Garantía</h3>
          <p style={{ color: 'var(--text-muted)' }}>Seguimiento en tiempo real y seguros para proteger tu inversión en cada milla del camino.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Coverage;