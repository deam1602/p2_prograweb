import React from 'react';

const FAQ = () => {
  const faqs = [
    { q: "¿Tienen cobertura en departamentos?", a: "Sí, llegamos a los 22 departamentos de Guatemala con nuestro servicio nacional." },
    { q: "¿Cuánto tiempo tarda un envío exprés?", a: "En la misma ciudad, entregamos en un rango de 4 horas tras la recolección." },
    { q: "¿Es seguro enviar artículos frágiles?", a: "Contamos con embalaje especializado y seguro contra accidentes opcional." },
    { q: "¿Cómo rastreo mi paquete?", a: "Por ahora, puedes consultar el estado vía WhatsApp con tu número de guía." }
  ];

  return (
    <section id="faq" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Preguntas Frecuentes</h2>
          <p>Resolvemos tus dudas rápidamentne para que envíes con total confianza.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {faqs.map((item, index) => (
            <div key={index} className="card" style={{ padding: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)' }}>Q.</span>
                {item.q}
              </h4>
              <p style={{ color: 'var(--text-muted)' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;