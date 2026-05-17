import React from 'react';
import { History, Target, Eye, ShieldCheck, Clock, Lightbulb } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="nosotros" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
      <div className="container">
        <div className="section-header">
          <h2>Sobre SkyShip Express</h2>
          <p>Conoce quiénes somos y qué nos impulsa cada día.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              <History size={28} />
              <h3>Nuestra Historia</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>SkyShip Express nació con la misión de conectar familias y empresas guatemaltecas a través de una logística eficiente, segura y altamente tecnológica.</p>
          </div>
          
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              <Target size={28} />
              <h3>Misión</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Brindar soluciones de transporte y paquetería con los más altos estándares de rapidez, confianza y experiencia al cliente.</p>
          </div>
          
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--primary)' }}>
              <Eye size={28} />
              <h3>Visión</h3>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Ser la plataforma líder en logística y distribución digital integral en la región para 2030.</p>
          </div>
        </div>

        <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2.5rem', color: 'var(--primary)' }}>Nuestros Valores</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.05)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Puntualidad</h4>
              <p style={{ color: 'var(--text-muted)' }}>Tu tiempo es nuestra prioridad absoluta. Cumplimos lo que prometemos.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.05)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Integridad</h4>
              <p style={{ color: 'var(--text-muted)' }}>Manejamos cada paquete con responsabilidad, como si fuera nuestro.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.05)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
              <Lightbulb size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Innovación</h4>
              <p style={{ color: 'var(--text-muted)' }}>Evolucionamos y aplicamos tecnología para facilitarte la vida todos los días.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;