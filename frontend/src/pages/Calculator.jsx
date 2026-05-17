import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { calculateShipping } from '../utils/pricing';
import ContactForm from '../components/ContactForm';

const Calculator = () => {
  const [formData, setFormData] = useState({
    origin: 'same_city',
    weight: '',
    length: '', width: '', height: '', // Opcionales
    serviceLevel: 'standard',
    extras: []
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRequestShipment = () => {
      if (user) {
          navigate('/dashboard/create-shipment', { state: { formData } });
      } else {
          alert('Por favor inicia sesión para solicitar un envío.');
          navigate('/login');
      }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const newExtras = checked
        ? [...formData.extras, value]
        : formData.extras.filter(extra => extra !== value);
      setFormData({ ...formData, extras: newExtras });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "El peso debe ser mayor a 0";
    }

    if (formData.length || formData.width || formData.height) {
      if (!formData.length || formData.length <= 0) newErrors.length = "Requerido si hay dimensiones";
      if (!formData.width || formData.width <= 0) newErrors.width = "Requerido si hay dimensiones";
      if (!formData.height || formData.height <= 0) newErrors.height = "Requerido si hay dimensiones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const calculation = calculateShipping(formData);
    setResult(calculation);
  };

  return (
    <section id="cotizador" className="calculator-section">
      <div className="container">
        <div className="section-header">
          <h2>Cotizador de Envíos</h2>
          <p>Calcula el costo estimado de tu envío en segundos</p>
        </div>

        <div className="calculator-grid">
          <form onSubmit={handleSubmit} className="shipping-form card" noValidate>
            <div className="form-group">
              <label>Origen y Destino:</label>
              <select name="origin" value={formData.origin} onChange={handleChange}>
                <option value="same_city">Misma Ciudad</option>
                <option value="department">Otro Departamento</option>
                <option value="international">Internacional</option>
              </select>
            </div>

            <div className="form-group">
              <label>Peso (kg):</label>
              <input
                type="number"
                name="weight"
                placeholder="Ej. 5"
                className={errors.weight ? 'error-input' : ''}
                value={formData.weight}
                onChange={e => { handleChange(e); if (errors.weight) setErrors({ ...errors, weight: '' }); }}
              />
              {errors.weight && <span className="error-text">{errors.weight}</span>}
            </div>

            <div className="form-group">
              <label>Dimensiones (cm) - Opcional</label>
              <div className="dimensions-grid">
                <div>
                  <input type="number" name="length" placeholder="Largo"
                    className={errors.length ? 'error-input' : ''}
                    onChange={e => { handleChange(e); if (errors.length) setErrors({ ...errors, length: '' }); }} />
                </div>
                <div>
                  <input type="number" name="width" placeholder="Ancho"
                    className={errors.width ? 'error-input' : ''}
                    onChange={e => { handleChange(e); if (errors.width) setErrors({ ...errors, width: '' }); }} />
                </div>
                <div>
                  <input type="number" name="height" placeholder="Alto"
                    className={errors.height ? 'error-input' : ''}
                    onChange={e => { handleChange(e); if (errors.height) setErrors({ ...errors, height: '' }); }} />
                </div>
              </div>
              {(errors.length || errors.width || errors.height) &&
                <span className="error-text">Al ingresar una dimensión, debe completar todas (mayores a 0).</span>}
            </div>

            <div className="form-group">
              <label>Nivel de Servicio:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="serviceLevel" value="standard" checked={formData.serviceLevel === 'standard'} onChange={handleChange} />
                  <span>Estándar</span>
                </label>
                <label className="radio-label">
                  <input type="radio" name="serviceLevel" value="express" checked={formData.serviceLevel === 'express'} onChange={handleChange} />
                  <span>Exprés</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Servicios Extras:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" value="pickup" onChange={handleChange} />
                  <span>Recolección a domicilio</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" value="insurance" onChange={handleChange} />
                  <span>Seguro contra pérdida</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Calcular Costo
            </button>
          </form>

          {/* Resultado y Desglose */}
          <div className="results-container">
            {result ? (
              <div className="results-card card fade-in">
                <h3>Resumen de Cotización</h3>

                <div className="price-tag">
                  <span className="currency">Q</span>
                  <span className="amount">{result.total}</span>
                </div>

                <div className="delivery-time">
                  <i className="icon-clock"></i> Tiempo estimado: <strong>{result.timeEstimate}</strong>
                </div>

                <hr className="divider" />

                <div className="breakdown">
                  <h4>Desglose de costos</h4>
                  <ul className="breakdown-list">
                    <li>
                      <span>Tarifa Base</span>
                      <span>Q{result.breakdown.costBase}</span>
                    </li>
                    <li>
                      <div className="weight-info">
                        <span>Costo por Peso ({result.breakdown.chargeableWeight} kg)</span>
                        {result.breakdown.appliedVolumetric &&
                          <span className="badge-volumetric">Aplicó peso volumétrico</span>
                        }
                      </div>
                      <span>Q{result.breakdown.costWeight}</span>
                    </li>
                    {result.breakdown.pickupCost > 0 && (
                      <li>
                        <span>Recolección</span>
                        <span>Q{result.breakdown.pickupCost}</span>
                      </li>
                    )}
                    {result.breakdown.insuranceCost > 0 && (
                      <li>
                        <span>Seguro</span>
                        <span>Q{result.breakdown.insuranceCost}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <button onClick={handleRequestShipment} className="btn-secondary" style={{ width: '100%', marginTop: '1.5rem' }}>
                  Solicitar Envío
                </button>
              </div>
            ) : (
              <div className="results-placeholder card">
                <div className="placeholder-icon">📦</div>
                <h3>Calcula tu envío</h3>
                <p>Ingresa los detalles de tu paquete en el formulario para ver una estimación del costo y tiempo de entrega.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

  );
};

export default Calculator;