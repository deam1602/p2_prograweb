import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    toggleMenu();
  };

  return (
    <nav className="navbar" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
      <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', marginLeft: '-1rem' }}>
        <img src="/skayship.png" alt="SkyShip Express Logo" style={{ height: '60px', objectFit: 'contain' }} />
      </Link>
      
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <X size={32} color="var(--accent)" /> : <Menu size={32} color="white" />}
      </div>

      <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/cotizador" onClick={toggleMenu}>Cotizador</Link></li>
        <li><Link to="/#servicios" onClick={toggleMenu}>Servicios</Link></li>
        <li><Link to="/#como-funciona" onClick={toggleMenu}>Cómo Funciona</Link></li>
        <li><Link to="/#nosotros" onClick={toggleMenu}>Nosotros</Link></li>
        <li><Link to="/#contacto" onClick={toggleMenu}>Contacto</Link></li>
        
        {user ? (
          <>
            <li><Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-quote" onClick={toggleMenu}>Mi Panel</Link></li>
            <li><button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>Cerrar Sesión</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={toggleMenu}>Ingresar</Link></li>
            <li><Link to="/register" className="btn-quote" onClick={toggleMenu}>Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;