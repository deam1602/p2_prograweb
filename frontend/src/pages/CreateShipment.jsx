import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { calculateShipping } from '../utils/pricing';

const CreateShipment = () => {
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('same_city');
    const [serviceLevel, setServiceLevel] = useState('standard');
    const [dimensions, setDimensions] = useState({ weight: '', length: '', width: '', height: '' });
    const [extras, setExtras] = useState([]);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [appliedVolumetric, setAppliedVolumetric] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.formData) {
            const data = location.state.formData;
            setOrigin(data.origin);
            setServiceLevel(data.serviceLevel);
            setDimensions({ weight: data.weight, length: data.length, width: data.width, height: data.height });
            setExtras(data.extras || []);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setDimensions({ ...dimensions, [e.target.name]: e.target.value });
    };

    const handleExtrasChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setExtras([...extras, value]);
        } else {
            setExtras(extras.filter(extra => extra !== value));
        }
    };

    useEffect(() => {
        if (dimensions.weight) {
            const data = {
                origin,
                serviceLevel,
                weight: Number(dimensions.weight),
                length: Number(dimensions.length) || 0,
                width: Number(dimensions.width) || 0,
                height: Number(dimensions.height) || 0,
                extras
            };
            const result = calculateShipping(data);
            setEstimatedCost(result.total);
            setAppliedVolumetric(result.breakdown.appliedVolumetric);
        } else {
            setEstimatedCost(0);
            setAppliedVolumetric(false);
        }
    }, [origin, serviceLevel, dimensions, extras]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shipments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    destination,
                    origin,
                    serviceLevel,
                    cost: Number(estimatedCost),
                    extras,
                    dimensions: {
                        weight: Number(dimensions.weight),
                        length: Number(dimensions.length) || 0,
                        width: Number(dimensions.width) || 0,
                        height: Number(dimensions.height) || 0
                    } 
                })
            });

            if (res.ok) {
                navigate('/dashboard');
            } else {
                const data = await res.json();
                setError(data.message || 'Error al crear el envío');
            }
        } catch (error) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '4rem' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Nueva Solicitud de Envío</h2>
                {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Dirección de Destino</label>
                        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required placeholder="Ej: 5ta avenida 12-34, Zona 10, Ciudad de Guatemala" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Origen / Destino</label>
                            <select value={origin} onChange={(e) => setOrigin(e.target.value)} required>
                                <option value="same_city">Misma Ciudad</option>
                                <option value="department">Interdepartamental</option>
                                <option value="international">Internacional</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Tipo de Servicio</label>
                            <select value={serviceLevel} onChange={(e) => setServiceLevel(e.target.value)} required>
                                <option value="standard">Estándar</option>
                                <option value="express">Express</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#FAFAFB', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Dimensiones del Paquete</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Peso (kg)</label>
                                <input type="number" name="weight" value={dimensions.weight} onChange={handleChange} required min="0.1" step="0.1" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Largo (cm)</label>
                                <input type="number" name="length" value={dimensions.length} onChange={handleChange} required min="1" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Ancho (cm)</label>
                                <input type="number" name="width" value={dimensions.width} onChange={handleChange} required min="1" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Alto (cm)</label>
                                <input type="number" name="height" value={dimensions.height} onChange={handleChange} required min="1" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Servicios Extras:</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#FAFAFB' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" value="pickup" checked={extras.includes('pickup')} onChange={handleExtrasChange} />
                                Recolección a domicilio
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" value="insurance" checked={extras.includes('insurance')} onChange={handleExtrasChange} />
                                Seguro contra pérdida
                            </label>
                        </div>
                    </div>

                    {estimatedCost > 0 && (
                        <div style={{ padding: '1rem', backgroundColor: 'var(--primary-light)', color: 'white', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '500' }}>Costo Estimado:</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Q{estimatedCost}</span>
                            </div>
                            {appliedVolumetric && (
                                <span className="badge-volumetric" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Aplicó peso volumétrico</span>
                            )}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancelar</button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Generando...' : 'Confirmar Envío'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateShipment;
