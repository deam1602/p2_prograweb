import React from 'react';
import { Truck, MapPin, PackageCheck, ClipboardList } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Solicitud",
      description: "Ingresa a nuestra plataforma y solicita la recolección de tu paquete con los datos de origen y destino.",
      icon: <ClipboardList size={40} className="step-icon" />
    },
    {
      id: 2,
      title: "Recolección",
      description: "Nuestro equipo recoge el paquete en la puerta de tu casa o empresa.",
      icon: <Truck size={40} className="step-icon" />
    },
    {
      id: 3,
      title: "Despacho",
      description: "Tu paquete es procesado en nuestro centro de logística y enviado a su destino.",
      icon: <MapPin size={40} className="step-icon" />
    },
    {
      id: 4,
      title: "Entrega",
      description: "Entregamos el paquete de forma segura y a tiempo al destinatario final.",
      icon: <PackageCheck size={40} className="step-icon" />
    }
  ];

  return (
    <section id="como-funciona" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2>¿Cómo Funciona?</h2>
          <p>Tu envío en 4 simples pasos</p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={step.id}>
              <div className="step-number">{step.id}</div>
              <div className="icon-wrapper">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
