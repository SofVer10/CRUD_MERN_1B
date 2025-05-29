import { useState } from 'react';
import { MapPin, Phone, Clock, Building, Store, Plus, Trash2, Navigation } from 'lucide-react';

export default function AgregarLocal() {
  const [locals, setLocals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.telephone) {
      alert('Por favor completa todos los campos requeridos (Nombre, Dirección y Teléfono)');
      return;
    }

    // Validar que el teléfono sea un número
    if (isNaN(formData.telephone) || formData.telephone.trim() === '') {
      alert('El teléfono debe ser un número válido');
      return;
    }
    
    const newLocal = {
      ...formData,
      telephone: parseInt(formData.telephone),
      id: Date.now(),
      createdAt: new Date().toLocaleDateString()
    };
    setLocals(prev => [...prev, newLocal]);
    setFormData({
      name: '',
      address: '',
      telephone: '',
      schedule: ''
    });
  };

  const deleteLocal = (id) => {
    setLocals(prev => prev.filter(local => local.id !== id));
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    return gradients[index % gradients.length];
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: '0',
      margin: '0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0'
    },
    contentWrapper: {
      padding: '24px',
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      maxWidth: '1200px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '3.2rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.25rem',
      fontWeight: '500'
    },
    mainContent: {
      display: 'flex',
      maxWidth: '1200px',
      width: '100%',
      gap: '48px',
      alignItems: 'flex-start'
    },
    leftColumn: {
      flex: '0 0 450px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    },
    rightColumn: {
      flex: '1',
      minWidth: '0'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '40px',
      borderTop: '8px solid #667eea',
      position: 'sticky',
      top: '24px'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center'
    },
    inputGroup: {
      marginBottom: '28px'
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '12px'
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa'
    },
    textarea: {
      width: '100%',
      padding: '16px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa',
      resize: 'vertical',
      minHeight: '100px'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '18px 32px',
      borderRadius: '12px',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 10px 15px -3px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    localsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '24px 32px',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    localsTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      margin: 0
    },
    localsCount: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '1rem',
      fontWeight: '600'
    },
    localsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    localCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.15)',
      padding: '0',
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    localCardHeader: {
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    localCardBody: {
      padding: '32px',
      paddingTop: '24px'
    },
    localName: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    localDetail: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '16px',
      padding: '12px',
      backgroundColor: '#f8fafc',
      borderRadius: '10px'
    },
    localDetailText: {
      color: '#4b5563',
      fontSize: '0.95rem',
      lineHeight: '1.4',
      flex: 1
    },
    localDetailLabel: {
      fontWeight: '600',
      color: '#374151',
      display: 'block',
      marginBottom: '4px'
    },
    localFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb'
    },
    deleteButton: {
      color: '#ef4444',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      padding: '12px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    emptyState: {
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.15)',
      padding: '60px 40px',
      textAlign: 'center',
      gridColumn: '1 / -1'
    },
    emptyStateText: {
      color: '#6b7280',
      fontSize: '1.4rem',
      marginBottom: '12px',
      fontWeight: '600'
    },
    emptyStateSubtext: {
      color: '#9ca3af',
      fontSize: '1.1rem'
    },
    createdDate: {
      fontSize: '0.8rem',
      color: '#9ca3af',
      fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Gestión de Locales Comerciales</h1>
          <p style={styles.subtitle}>Administra y organiza todos tus puntos de venta en un solo lugar</p>
        </div>

        <div style={styles.mainContent}>
          {/* Columna Izquierda */}
          <div style={styles.leftColumn}>
            {/* Formulario */}
            <div style={styles.formCard}>
              <h2 style={styles.sectionTitle}>
                <Plus style={{ marginRight: '12px', color: '#667eea' }} />
                Registrar Local
              </h2>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre del Local *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  style={styles.input}
                  placeholder="Ej: Sucursal Centro"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Dirección *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  style={styles.input}
                  placeholder="Ej: Av. Principal #123, Col. Centro"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Teléfono *</label>
                <input
                  type="number"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  style={styles.input}
                  placeholder="25551234"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Horarios de Atención</label>
                <textarea
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Ej: Lunes a Viernes: 8:00 AM - 6:00 PM&#10;Sábados: 8:00 AM - 2:00 PM&#10;Domingos: Cerrado"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                style={styles.submitButton}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Store size={20} />
                Registrar Local
              </button>
            </div>
          </div>

          {/* Columna Derecha */}
          <div style={styles.rightColumn}>
            <div style={styles.localsHeader}>
              <h2 style={styles.localsTitle}>
                <MapPin style={{ marginRight: '12px', color: '#667eea' }} />
                Locales Registrados
              </h2>
              <div style={styles.localsCount}>
                {locals.length} {locals.length === 1 ? 'Local' : 'Locales'}
              </div>
            </div>
            
            {locals.length === 0 ? (
              <div style={styles.localsGrid}>
                <div style={styles.emptyState}>
                  <Store style={{ width: '80px', height: '80px', color: '#9ca3af', margin: '0 auto 24px' }} />
                  <p style={styles.emptyStateText}>No hay locales registrados</p>
                  <p style={styles.emptyStateSubtext}>Comienza agregando tu primer local comercial</p>
                </div>
              </div>
            ) : (
              <div style={styles.localsGrid}>
                {locals.map((local, index) => (
                  <div 
                    key={local.id} 
                    style={styles.localCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    <div style={{
                      ...styles.localCardHeader,
                      background: getRandomGradient(index)
                    }}>
                      <Store size={40} color="white" />
                    </div>
                    
                    <div style={styles.localCardBody}>
                      <h3 style={styles.localName}>
                        <Building size={20} color="#667eea" />
                        {local.name}
                      </h3>
                      
                      <div style={styles.localDetail}>
                        <MapPin size={18} color="#6b7280" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={styles.localDetailText}>
                          <span style={styles.localDetailLabel}>Dirección:</span>
                          {local.address}
                        </div>
                      </div>
                      
                      <div style={styles.localDetail}>
                        <Phone size={18} color="#6b7280" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={styles.localDetailText}>
                          <span style={styles.localDetailLabel}>Teléfono:</span>
                          {local.telephone}
                        </div>
                      </div>
                      
                      {local.schedule && (
                        <div style={styles.localDetail}>
                          <Clock size={18} color="#6b7280" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <div style={styles.localDetailText}>
                            <span style={styles.localDetailLabel}>Horarios:</span>
                            <div style={{ whiteSpace: 'pre-line' }}>{local.schedule}</div>
                          </div>
                        </div>
                      )}
                      
                      <div style={styles.localFooter}>
                        <span style={styles.createdDate}>
                          Registrado el {local.createdAt}
                        </span>
                        <button
                          onClick={() => deleteLocal(local.id)}
                          style={styles.deleteButton}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#fca5a5';
                            e.target.style.color = '#ffffff';
                            e.target.style.borderColor = '#f87171';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#fef2f2';
                            e.target.style.color = '#ef4444';
                            e.target.style.borderColor = '#fecaca';
                          }}
                          title="Eliminar local"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}