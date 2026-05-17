import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shipments`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setShipments(data);
                }
            } catch (error) {
                console.error("Error fetching shipments:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchShipments();
        }
    }, [token]);

    const getStatusBadge = (status) => {
        switch(status) {
            case 'pending': return <span style={{ backgroundColor: '#FEF3C7', color: '#D97706', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Pendiente</span>;
            case 'in_transit': return <span style={{ backgroundColor: '#DBEAFE', color: '#2563EB', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>En Tránsito</span>;
            case 'delivered': return <span style={{ backgroundColor: '#D1FAE5', color: '#059669', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Entregado</span>;
            default: return status;
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Mis Envíos</h2>
                <Link to="/dashboard/create-shipment" className="btn-primary">Crear Nuevo Envío</Link>
            </div>

            {loading ? (
                <p>Cargando envíos...</p>
            ) : shipments.length === 0 ? (
                <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-muted)' }}>No tienes envíos registrados</h3>
                    <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>Genera tu primera solicitud de envío para comenzar.</p>
                    <Link to="/dashboard/create-shipment" className="btn-primary">Crear Envío</Link>
                </div>
            ) : (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '1rem' }}>Guía</th>
                                <th style={{ padding: '1rem' }}>Destino</th>
                                <th style={{ padding: '1rem' }}>Fecha</th>
                                <th style={{ padding: '1rem' }}>Costo Estimado</th>
                                <th style={{ padding: '1rem' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shipments.map((shipment) => (
                                <tr key={shipment._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{shipment.trackingCode}</td>
                                    <td style={{ padding: '1rem' }}>{shipment.destination}</td>
                                    <td style={{ padding: '1rem' }}>{new Date(shipment.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem' }}>${shipment.cost.toFixed(2)}</td>
                                    <td style={{ padding: '1rem' }}>{getStatusBadge(shipment.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
