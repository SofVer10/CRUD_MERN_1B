import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, CreditCard, Shield, Edit3, Save, X } from 'lucide-react';
import useClients from '../hooks/useClients'; // Importar el hook personalizado

export default function ClientManagement() {
  const { 
    clients, 
    loading, 
    error, 
    fetchClients, 
    createClient, 
    updateClient,
    deleteClient 
  } = useClients();

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


  const [editingClient, setEditingClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const clearForm = () => {
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
    setEditingClient(null);
    setIsEditing(false);
  };

  // Función para cargar datos del cliente 
  const handleEditClient = (client) => {
    setFormData({
      name: client.name || '',
      lastName: client.lastName || '',
      birthday: client.birthday || '',
      email: client.email || '',
      password: '', 
      telephone: client.telephone?.toString() || '',
      dui: client.dui || '',
      isVerified: client.isVerified || false
    });
    setEditingClient(client);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    clearForm();
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.lastName || !formData.email || !formData.telephone || !formData.birthday || !formData.dui) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    

    const clientData = {
      ...formData,
      telephone: parseInt(formData.telephone) 
    };

    if (isEditing && !formData.password) {
      delete clientData.password;
    }

    let success;
    if (isEditing) {
      success = await updateClient(editingClient._id, clientData);
      if (success) {
        alert('Cliente actualizado exitosamente');
        clearForm();
      } else {
        alert('Error al actualizar el cliente. Intenta de nuevo.');
      }
    } else {
      if (!formData.password) {
        alert('La contraseña es requerida para nuevos clientes');
        return;
      }
      success = await createClient(clientData);
      if (success) {
        alert('Cliente registrado exitosamente');
        clearForm();
      } else {
        alert('Error al registrar el cliente. Intenta de nuevo.');
      }
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      const success = await deleteClient(id);
      if (success) {
        alert('Cliente eliminado exitosamente');
        // Si estábamos editando este cliente, limpiar el formulario
        if (editingClient && editingClient._id === id) {
          clearForm();
        }
      } else {
        alert('Error al eliminar el cliente');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #dbeafe 0%, #fecaca 100%)',
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
      padding: '20px',
      height: '100vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      width: '100%'
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
    content: {
      display: 'flex',
      maxWidth: '1200px',
      width: '100%',
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
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      border: '2px solid rgba(37, 99, 235, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      backgroundImage: 'url("https://mir-s3-cdn-cf.behance.net/project_modules/1400/77f8a2161385403.63d855cdbae74.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
      position: 'relative'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    formAndCardsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '40px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '32px',
      borderTop: isEditing ? '4px solid #f59e0b' : '4px solid #2563eb'
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
    buttonContainer: {
      display: 'flex',
      gap: '12px'
    },
    submitButton: {
      flex: 1,
      background: loading ? 'linear-gradient(45deg, #94a3b8, #94a3b8)' : 
                  isEditing ? 'linear-gradient(45deg, #f59e0b, #d97706)' : 
                  'linear-gradient(45deg, #2563eb, #dc2626)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '16px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      opacity: loading ? 0.7 : 1
    },
    cancelButton: {
      flex: '0 0 auto',
      background: 'linear-gradient(45deg, #6b7280, #4b5563)',
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
      transition: 'box-shadow 0.2s, transform 0.2s',
      cursor: 'pointer'
    },
    clientCardEditing: {
      backgroundColor: '#fffbeb',
      borderLeft: '4px solid #f59e0b',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      transform: 'scale(1.02)'
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
    badgeOrange: {
      backgroundColor: '#fed7aa',
      color: '#9a3412'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      color: '#f59e0b',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.2s'
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
      maxHeight: '600px',
      overflowY: 'auto',
      paddingRight: '8px'
    },
    responsiveHide: {
      display: window.innerWidth < 1024 ? 'none' : 'flex'
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      border: '1px solid #fecaca'
    },
    loadingMessage: {
      backgroundColor: '#f0f9ff',
      color: '#1e40af',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      border: '1px solid #bfdbfe'
    },
    editingIndicator: {
      backgroundColor: '#fffbeb',
      color: '#92400e',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '16px',
      border: '1px solid #fed7aa',
      display: 'flex',
      alignItems: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Gestión de Clientes</h1>
          <p style={styles.subtitle}>Administra la información de tus clientes de forma eficiente</p>
        </div>


        {error && (
          <div style={styles.errorMessage}>
            Error: {error}
          </div>
        )}

        <div style={styles.content}>
  
          <div style={{...styles.decorativeSection, ...styles.responsiveHide}}>
            <div style={styles.decorativeImage}>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                borderRadius: '24px'
              }}></div>
            </div>
          </div>


          <div style={styles.mainContent}>
            <div style={styles.formAndCardsContainer}>
              {/* Formulario */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>
                  {isEditing ? (
                    <>
                      <Edit3 style={{ marginRight: '12px', color: '#f59e0b' }} />
                      Editar Cliente
                    </>
                  ) : (
                    <>
                      <User style={{ marginRight: '12px', color: '#2563eb' }} />
                      Registrar Nuevo Cliente
                    </>
                  )}
                </h2>

                {/* Edición */}
                {isEditing && (
                  <div style={styles.editingIndicator}>
                    <Edit3 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Editando: {editingClient?.name} {editingClient?.lastName}
                  </div>
                )}
                
                <div>

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
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        disabled={loading}
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
                        disabled={loading}
                      />
                    </div>
                  </div>


                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      Contraseña {isEditing && <span style={{color: '#6b7280', fontWeight: 'normal'}}>(dejar vacío para mantener actual)</span>}
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={!isEditing}
                      style={styles.input}
                      placeholder={isEditing ? "Nueva contraseña (opcional)" : "Ingresa la contraseña"}
                      disabled={loading}
                    />
                  </div>

                  <div style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={formData.isVerified}
                      onChange={handleInputChange}
                      style={styles.checkbox}
                      disabled={loading}
                    />
                    <label style={styles.label}>Cliente Verificado</label>
                  </div>

                  <div style={styles.buttonContainer}>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      style={styles.submitButton}
                      onMouseOver={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
                      onMouseOut={(e) => !loading && (e.target.style.transform = 'scale(1)')}
                      disabled={loading}
                    >
                      {loading ? 
                        (isEditing ? 'Actualizando...' : 'Registrando...') : 
                        (isEditing ? 'Actualizar Cliente' : 'Registrar Cliente')
                      }
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        style={styles.cancelButton}
                        onMouseOver={(e) => (e.target.style.transform = 'scale(1.02)')}
                        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                        disabled={loading}
                      >
                        <X style={{ width: '16px', height: '16px' }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Lista de Clientes */}
              <div>
                <h2 style={styles.sectionTitle}>
                  <CreditCard style={{ marginRight: '12px', color: '#dc2626' }} />
                  Clientes Registrados ({clients.length})
                </h2>
                
                {loading && clients.length === 0 && (
                  <div style={styles.loadingMessage}>
                    Cargando clientes...
                  </div>
                )}

                {clients.length === 0 && !loading ? (
                  <div style={styles.emptyState}>
                    <User style={{ width: '64px', height: '64px', color: '#9ca3af', margin: '0 auto 16px' }} />
                    <p style={styles.emptyStateText}>No hay clientes registrados aún</p>
                    <p style={styles.emptyStateSubtext}>Usa el formulario para agregar el primer cliente</p>
                  </div>
                ) : (
                  <div style={styles.scrollArea}>
                    {clients.map((client) => (
                      <div 
                        key={client._id} 
                        style={{
                          ...styles.clientCard,
                          ...(editingClient && editingClient._id === client._id ? styles.clientCardEditing : {})
                        }}
                        onMouseOver={(e) => {
                          if (!editingClient || editingClient._id !== client._id) {
                            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!editingClient || editingClient._id !== client._id) {
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        <div style={styles.clientHeader}>
                          <div 
                            style={styles.clientInfo}
                            onClick={() => handleEditClient(client)}
                          >
                            <h3 style={styles.clientName}>
                              {client.name} {client.lastName}
                              {client.isVerified && (
                                <Shield style={{ width: '20px', height: '20px', color: '#16a34a', marginLeft: '8px' }} />
                              )}
                              {editingClient && editingClient._id === client._id && (
                                <Edit3 style={{ width: '20px', height: '20px', color: '#f59e0b', marginLeft: '8px' }} />
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
                                Registrado: {formatDate(client.createdAt)}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                  ...styles.badge,
                                  ...(client.isVerified ? styles.badgeGreen : styles.badgeYellow)
                                }}>
                                  {client.isVerified ? 'Verificado' : 'Pendiente'}
                                </span>
                                {editingClient && editingClient._id === client._id && (
                                  <span style={{...styles.badge, ...styles.badgeOrange}}>
                                    Editando
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div style={styles.actionButtons}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClient(client);
                              }}
                              style={styles.editButton}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#fef3c7'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                              title="Editar cliente"
                              disabled={loading}
                            >
                              <Edit3 style={{ width: '16px', height: '16px' }} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClient(client._id);
                              }}
                              style={styles.deleteButton}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                              title="Eliminar cliente"
                              disabled={loading}
                            >
                              ✕
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
      </div>
    </div>
  );
}