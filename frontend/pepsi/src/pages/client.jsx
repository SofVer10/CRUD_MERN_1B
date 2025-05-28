import { useState } from 'react';
import { User, Mail, Phone, Calendar, CreditCard, Shield } from 'lucide-react';

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    telephone: '',
    dui: '',
    isVerified: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.lastName || !formData.email || !formData.telephone || !formData.birthday || !formData.dui || !formData.password) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    const newClient = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString()
    };
    setClients(prev => [...prev, newClient]);
    setFormData({
      name: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      telephone: '',
      dui: '',
      isVerified: false
    });
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #dbeafe 0%, #fecaca 100%)',
      padding: '0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto'
    },
    content: {
      minHeight: '100vh',
      padding: '24px',
      display: 'flex',
      maxWidth: '1400px',
      margin: '0 auto',
      gap: '32px'
    },
    decorativeSection: {
      flex: '0 0 320px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    },
    decorativeImage: {
      width: '280px',
      height: '350px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '24px',
      border: '2px solid rgba(37, 99, 235, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='.1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d1d5db' fill-opacity='0.3'%3E%3Crect x='100' y='100' width='100' height='100'/%3E%3Crect x='0' y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.3'%3E%3Cpolygon fill='url(%23a)' points='100,30 0,0 200,0'/%3E%3Cpolygon fill='url(%23b)' points='100,100 0,130 0,100 200,100 200,130'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    },
    placeholderContent: {
      textAlign: 'center',
      color: '#6b7280',
      zIndex: 2,
      position: 'relative'
    },
    placeholderIcon: {
      width: '64px',
      height: '64px',
      marginBottom: '16px',
      opacity: 0.7
    },
    placeholderText: {
      fontSize: '16px',
      fontWeight: '500',
      margin: '0 0 8px 0',
      color: '#4b5563'
    },
    placeholderSubtext: {
      fontSize: '14px',
      margin: 0,
      opacity: 0.8
    },
    decorativeText: {
      color: '#4b5563',
      textAlign: 'center',
      fontSize: '15px',
      fontStyle: 'italic',
      lineHeight: '1.5',
      maxWidth: '260px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: '12px 16px',
      borderRadius: '12px',
      border: '1px solid rgba(37, 99, 235, 0.1)'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      position: 'relative',
      zIndex: 10
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem',
      fontWeight: '500'
    },
    formAndCardsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '32px',
      borderTop: '4px solid #2563eb'
    },
    cardRed: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '32px',
      borderTop: '4px solid #dc2626'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center'
    },
    inputGroup: {
      marginBottom: '24px'
    },
    inputGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      accentColor: '#2563eb'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(45deg, #2563eb, #dc2626)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    clientCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      borderLeft: '4px solid #2563eb',
      marginBottom: '16px',
      transition: 'box-shadow 0.2s'
    },
    clientHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    clientInfo: {
      flex: 1
    },
    clientName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center'
    },
    clientDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px',
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '12px'
    },
    clientDetail: {
      display: 'flex',
      alignItems: 'center'
    },
    clientFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    badge: {
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    badgeGreen: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    badgeYellow: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    deleteButton: {
      color: '#ef4444',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.2s'
    },
    emptyState: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '48px',
      textAlign: 'center',
      borderTop: '4px solid #dc2626'
    },
    emptyStateText: {
      color: '#6b7280',
      fontSize: '1.125rem',
      marginBottom: '8px'
    },
    emptyStateSubtext: {
      color: '#9ca3af'
    },
    scrollArea: {
      maxHeight: '500px',
      overflowY: 'auto'
    },
    responsiveHide: {
      display: window.innerWidth < 1024 ? 'none' : 'flex'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Sección Decorativa Mejorada */}
        <div style={{...styles.decorativeSection, ...styles.responsiveHide}}>
          <div style={styles.decorativeImage}>
            <div style={styles.placeholderContent}>
              <User style={styles.placeholderIcon} />
              <p style={styles.placeholderText}>Tu Imagen Aquí</p>
              <p style={styles.placeholderSubtext}>Producto o Logo</p>
            </div>
          </div>
          <p style={styles.decorativeText}>
            <strong>Live for Now</strong><br/>
            Pepsi: La elección ,<br/>
            de una nueva generación
          </p>
        </div>

        {/* Contenido Principal */}
        <div style={styles.mainContent}>
          {/* Header Mejorado */}
          <div style={styles.header}>
            <h1 style={styles.title}>Sistema de Gestión de Clientes</h1>
            <p style={styles.subtitle}>Administra la información de tus clientes de forma eficiente</p>
          </div>

          <div style={styles.formAndCardsContainer}>
            {/* Formulario */}
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>
                <User style={{ marginRight: '12px', color: '#2563eb' }} />
                Registrar Nuevo Cliente
              </h2>
              
              <div>
                {/* Nombre y Apellido */}
                <div style={styles.inputGrid}>
                  <div>
                    <label style={styles.label}>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      style={styles.input}
                      placeholder="Ingresa el nombre"
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Apellido</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      style={styles.input}
                      placeholder="Ingresa el apellido"
                    />
                  </div>
                </div>

                {/* Email y Teléfono */}
                <div style={styles.inputGrid}>
                  <div>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Teléfono</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                      placeholder="1234-5678"
                    />
                  </div>
                </div>

                {/* Fecha de nacimiento y DUI */}
                <div style={styles.inputGrid}>
                  <div>
                    <label style={styles.label}>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>DUI</label>
                    <input
                      type="text"
                      name="dui"
                      value={formData.dui}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                      placeholder="12345678-9"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                    placeholder="Ingresa la contraseña"
                  />
                </div>

                {/* Verificado */}
                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="isVerified"
                    checked={formData.isVerified}
                    onChange={handleInputChange}
                    style={styles.checkbox}
                  />
                  <label style={styles.label}>Cliente Verificado</label>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  style={styles.submitButton}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Registrar Cliente
                </button>
              </div>
            </div>

            {/* Lista de Clientes */}
            <div>
              <h2 style={styles.sectionTitle}>
                <CreditCard style={{ marginRight: '12px', color: '#dc2626' }} />
                Clientes Registrados ({clients.length})
              </h2>
              
              {clients.length === 0 ? (
                <div style={styles.emptyState}>
                  <User style={{ width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 16px' }} />
                  <p style={styles.emptyStateText}>No hay clientes registrados aún</p>
                  <p style={styles.emptyStateSubtext}>Usa el formulario para agregar el primer cliente</p>
                </div>
              ) : (
                <div style={styles.scrollArea}>
                  {clients.map((client) => (
                    <div key={client.id} style={styles.clientCard}>
                      <div style={styles.clientHeader}>
                        <div style={styles.clientInfo}>
                          <h3 style={styles.clientName}>
                            {client.name} {client.lastName}
                            {client.isVerified && (
                              <Shield style={{ width: '20px', height: '20px', color: '#16a34a', marginLeft: '8px' }} />
                            )}
                          </h3>
                          
                          <div style={styles.clientDetails}>
                            <div style={styles.clientDetail}>
                              <Mail style={{ width: '16px', height: '16px', marginRight: '8px', color: '#3b82f6' }} />
                              {client.email}
                            </div>
                            <div style={styles.clientDetail}>
                              <Phone style={{ width: '16px', height: '16px', marginRight: '8px', color: '#10b981' }} />
                              {client.telephone}
                            </div>
                            <div style={styles.clientDetail}>
                              <Calendar style={{ width: '16px', height: '16px', marginRight: '8px', color: '#8b5cf6' }} />
                              {client.birthday}
                            </div>
                            <div style={styles.clientDetail}>
                              <CreditCard style={{ width: '16px', height: '16px', marginRight: '8px', color: '#ef4444' }} />
                              {client.dui}
                            </div>
                          </div>
                          
                          <div style={styles.clientFooter}>
                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                              Registrado: {client.createdAt}
                            </span>
                            <span style={{
                              ...styles.badge,
                              ...(client.isVerified ? styles.badgeGreen : styles.badgeYellow)
                            }}>
                              {client.isVerified ? 'Verificado' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteClient(client.id)}
                          style={styles.deleteButton}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                          title="Eliminar cliente"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}