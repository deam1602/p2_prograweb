import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });
  const [status, setStatus] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,15}$/;

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!emailRegex.test(formData.correo)) newErrors.correo = "Correo inválido";
    if (!phoneRegex.test(formData.telefono)) newErrors.telefono = "Teléfono debe ser numérico (8-15 dígitos)";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('enviando');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.correo,
          message: `Teléfono: ${formData.telefono}\nMensaje: ${formData.mensaje}`
        })
      });
      
      if (res.ok) {
        setStatus('exito');
        setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <h3>Contáctanos</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <input type="text" placeholder="Nombre completo"
            className={errors.nombre ? 'error-input' : ''}
            value={formData.nombre} onChange={e => { setFormData({ ...formData, nombre: e.target.value }); if (errors.nombre) setErrors({ ...errors, nombre: '' }) }} />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>

        <div className="input-group">
          <input type="email" placeholder="Correo electrónico"
            className={errors.correo ? 'error-input' : ''}
            value={formData.correo} onChange={e => { setFormData({ ...formData, correo: e.target.value }); if (errors.correo) setErrors({ ...errors, correo: '' }) }} />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>

        <div className="input-group">
          <input type="tel" placeholder="Teléfono"
            className={errors.telefono ? 'error-input' : ''}
            value={formData.telefono} 
            onChange={e => { 
              const onlyNums = e.target.value.replace(/[^0-9]/g, '');
              setFormData({ ...formData, telefono: onlyNums }); 
              if (errors.telefono) setErrors({ ...errors, telefono: '' }) 
            }} />
          {errors.telefono && <span className="error-text">{errors.telefono}</span>}
        </div>

        <div className="input-group">
          <textarea placeholder="Mensaje"
            className={errors.mensaje ? 'error-input' : ''}
            value={formData.mensaje} onChange={e => { setFormData({ ...formData, mensaje: e.target.value }); if (errors.mensaje) setErrors({ ...errors, mensaje: '' }) }} />
          {errors.mensaje && <span className="error-text">{errors.mensaje}</span>}
        </div>

        <button type="submit" disabled={status === 'enviando'}>
          {status === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>

        {status === 'exito' && <p className="success-msg">¡Datos enviados correctamente!</p>}
        {status === 'error' && <p className="error-msg">Hubo un error al enviar el mensaje. Inténtalo de nuevo.</p>}
      </form>
    </section>
  );
};

export default ContactForm;