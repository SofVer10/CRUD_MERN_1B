import React, { useState } from 'react';
import { Menu, X, Users, MapPin, Package, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determinar la ruta activa basada en la URL actual
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/clients') return 'clients';
    if (path === '/locals') return 'locals';
    if (path === '/products') return 'products';
    return 'clients'; // default
  };
  
  const activeItem = getActiveItem();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { id: 'clients', label: 'Clientes', icon: Users, count: null, path: '/clients' },
    { id: 'locals', label: 'Locales', icon: MapPin, count: 15, path: '/locals' },
    { id: 'products', label: 'Productos', icon: Package, count: 28, path: '/products' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .sidebar {
          background: #1a1a1a;
          border-right: 1px solid #333;
          box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
          font-family: 'Inter', sans-serif;
        }
        
        .pepsi-logo {
          font-family: 'Fredoka One', cursive;
          font-size: 1.5rem;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: #0048a3;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          border: 2px solid #ff0000;
        }
        
        .menu-section {
          margin-bottom: 1.5rem;
        }
        
        .section-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
          padding: 0 1rem;
        }
        
        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          margin: 0.25rem 0.5rem;
          border-radius: 8px;
          color: #ccc;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .menu-item:hover {
          background: #2a2a2a;
          color: #ffffff;
        }
        
        .menu-item.active {
          background: #0048a3;
          color: #ffffff;
        }
        
        .menu-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .item-count {
          background: #ff0000;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          min-width: 24px;
          text-align: center;
        }
        
        .mobile-toggle {
          background: #1a1a1a;
          border: 1px solid #333;
          color: white;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .mobile-toggle:hover {
          background: #2a2a2a;
        }
        
        .mobile-overlay {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        
        .mobile-sidebar {
          background: #1a1a1a;
          border-right: 1px solid #333;
          box-shadow: 8px 0 24px rgba(0, 0, 0, 0.5);
        }
        
        .close-button {
          background: none;
          border: none;
          color: #ccc;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .close-button:hover {
          color: white;
          background: #2a2a2a;
        }
      `}</style>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 sidebar">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-gray-700">
            <div className="pepsi-logo">
              <div className="logo-icon">P</div>
              <span>Pepsi</span>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              <div className="menu-section">
                <div className="section-title">Gestión</div>
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                    >
                      <div className="menu-item-content">
                        <IconComponent size={20} />
                        <span>{item.label}</span>
                      </div>
                      {item.count && (
                        <span className="item-count">{item.count}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 mobile-overlay" onClick={toggleMenu}>
          <div className="fixed inset-y-0 left-0 w-64 mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                <div className="pepsi-logo">
                  <div className="logo-icon">P</div>
                  <span>Pepsi</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="close-button"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Mobile Navigation */}
              <div className="flex-1 pt-5 pb-4 overflow-y-auto">
                <nav className="space-y-1">
                  <div className="menu-section">
                    <div className="section-title">Gestión</div>
                    {menuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                          onClick={() => toggleMenu()}
                        >
                          <div className="menu-item-content">
                            <IconComponent size={20} />
                            <span>{item.label}</span>
                          </div>
                          {item.count && (
                            <span className="item-count">{item.count}</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content Area - Eliminado para que funcione con React Router */}
    </>
  );
};

export default NavComponent;