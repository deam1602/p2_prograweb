import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [editingUser, setEditingUser] = useState(null);

    const { token, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'stats') {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) setStats(await res.json());
                } else if (activeTab === 'users') {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) setUsers(await res.json());
                } else if (activeTab === 'shipments') {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/shipments`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) setShipments(await res.json());
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, token, user, navigate]);

    // CRUD ENVIOS
    const handleUpdateShipmentStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/shipments/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setShipments(shipments.map(s => s._id === id ? { ...s, status: newStatus } : s));
            }
        } catch (error) {
            console.error('Error updating status', error);
        }
    };

    const handleDeleteShipment = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este envío?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/shipments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setShipments(shipments.filter(s => s._id !== id));
            }
        } catch (error) {
            console.error('Error deleting shipment', error);
        }
    };

    // USUARIOS CRUD
    const handleDeleteUser = async (id) => {
        if (!window.confirm('¿Eliminar usuario de forma permanente?')) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== id));
            }
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${editingUser._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editingUser.name,
                    email: editingUser.email,
                    phone: editingUser.phone,
                    address: editingUser.address
                })
            });
            if (res.ok) {
                const updated = await res.json();
                setUsers(users.map(u => u._id === updated._id ? updated : u));
                setEditingUser(null);
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    // Utils
    const getMonthName = (monthNum) => {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return months[monthNum - 1] || monthNum;
    };
    
    const getOriginName = (val) => {
        if(val === 'same_city') return 'Misma Ciudad';
        if(val === 'department') return 'Interdepartamental';
        if(val === 'international') return 'Internacional';
        return val || 'Desconocido';
    };

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '80vh', position: 'relative', paddingBottom: '4rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Panel de Administración</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                    onClick={() => setActiveTab('stats')}
                    className={activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}
                >Estadísticas</button>
                <button 
                    onClick={() => setActiveTab('users')}
                    className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}
                >Usuarios</button>
                <button 
                    onClick={() => setActiveTab('shipments')}
                    className={activeTab === 'shipments' ? 'btn-primary' : 'btn-secondary'}
                >Envíos Generales</button>
            </div>

            {loading ? <p>Cargando información...</p> : (
                <div className="card" style={{ padding: '2rem' }}>
                    {activeTab === 'stats' && stats && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '1.5rem', backgroundColor: '#FAFAFB', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                                    <h3>Total Usuarios</h3>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{stats.totalUsers}</p>
                                </div>
                                <div style={{ padding: '1.5rem', backgroundColor: '#FAFAFB', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                                    <h3>Total Envíos</h3>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{stats.totalShipments}</p>
                                </div>
                                <div style={{ padding: '1.5rem', backgroundColor: '#FAFAFB', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                                    <h3>Ingresos Proyectados</h3>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>Q{stats.totalRevenue.toFixed(2)}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                                    <h4>Envíos por Mes</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                        {stats.shipmentsByMonth && stats.shipmentsByMonth.length > 0 ? (
                                            stats.shipmentsByMonth.map(m => (
                                                <li key={m._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eaeaea' }}>
                                                    <span>{getMonthName(m._id)}</span>
                                                    <span style={{ fontWeight: 'bold' }}>{m.count} envíos</span>
                                                </li>
                                            ))
                                        ) : <p>No hay datos.</p>}
                                    </ul>
                                </div>

                                <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                                    <h4>Envíos por Región (Origen)</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                        {stats.shipmentsByOrigin && stats.shipmentsByOrigin.length > 0 ? (
                                            stats.shipmentsByOrigin.map(o => (
                                                <li key={o._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eaeaea' }}>
                                                    <span>{getOriginName(o._id)}</span>
                                                    <span style={{ fontWeight: 'bold' }}>{o.count} envíos</span>
                                                </li>
                                            ))
                                        ) : <p>No hay datos.</p>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>
                                    <tr>
                                        <th style={{ padding: '1rem' }}>Nombre</th>
                                        <th style={{ padding: '1rem' }}>Correo</th>
                                        <th style={{ padding: '1rem' }}>Teléfono</th>
                                        <th style={{ padding: '1rem' }}>Fecha Registro</th>
                                        <th style={{ padding: '1rem' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>{u.name}</td>
                                            <td style={{ padding: '1rem' }}>{u.email}</td>
                                            <td style={{ padding: '1rem' }}>{u.phone}</td>
                                            <td style={{ padding: '1rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => setEditingUser(u)} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                                                <button onClick={() => handleDeleteUser(u._id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'shipments' && (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ backgroundColor: 'var(--primary-light)', color: 'white' }}>
                                    <tr>
                                        <th style={{ padding: '1rem' }}>Guía</th>
                                        <th style={{ padding: '1rem' }}>Usuario</th>
                                        <th style={{ padding: '1rem' }}>Destino</th>
                                        <th style={{ padding: '1rem' }}>Costo</th>
                                        <th style={{ padding: '1rem' }}>Estado</th>
                                        <th style={{ padding: '1rem' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shipments.map(s => (
                                        <tr key={s._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem', fontWeight: '600' }}>{s.trackingCode}</td>
                                            <td style={{ padding: '1rem' }}>{s.userId?.email || 'N/A'}</td>
                                            <td style={{ padding: '1rem' }}>{s.destination}</td>
                                            <td style={{ padding: '1rem' }}>Q{s.cost?.toFixed(2) || '0.00'}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <select 
                                                    value={s.status} 
                                                    onChange={(e) => handleUpdateShipmentStatus(s._id, e.target.value)}
                                                    style={{ padding: '0.25rem', width: 'auto' }}
                                                >
                                                    <option value="pending">Pendiente</option>
                                                    <option value="in_transit">En Tránsito</option>
                                                    <option value="delivered">Entregado</option>
                                                </select>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button onClick={() => handleDeleteShipment(s._id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* modal edicion de usuario */}
            {editingUser && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ padding: '2rem', width: '400px', backgroundColor: 'white' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Editar Usuario</h3>
                        <form onSubmit={handleUpdateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Nombre</label>
                                <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Correo</label>
                                <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Teléfono</label>
                                <input type="text" value={editingUser.phone} onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Dirección</label>
                                <input type="text" value={editingUser.address} onChange={(e) => setEditingUser({...editingUser, address: e.target.value})} required />
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn-secondary" onClick={() => setEditingUser(null)}>Cancelar</button>
                                <button type="submit" className="btn-primary">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
