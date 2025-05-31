import { useState } from 'react';
import { MapPin, Phone, Clock, Building, Store, Plus, Trash2, Navigation, Edit3, X, Save } from 'lucide-react';
import useLocals from '../hooks/useLocals'; // Importa el hook personalizado

export default function AgregarLocal() {
  // Usar el hook personalizado en lugar de useState local
  const { locals, loading, error, createLocal, deleteLocal, updateLocal } = useLocals();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });

  // Estados para el modo de edición
  const [editingLocal, setEditingLocal] = useState(null); // ID del local que se está editando
  const [isEditMode, setIsEditMode] = useState(false); // Si estamos en modo edición

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para cargar datos de un local en el formulario para editar
  const handleEditLocal = (local) => {
    setFormData({
      name: local.name,
      address: local.address,
      telephone: local.telephone.toString(),
      schedule: local.schedule || ''
    });
    setEditingLocal(local._id);
    setIsEditMode(true);
    
    // Hacer scroll hacia el formulario
    const formElement = document.querySelector('#form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setFormData({
      name: '',
      address: '',
      telephone: '',
      schedule: ''
    });
    setEditingLocal(null);
    setIsEditMode(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.address || !formData.telephone) {
      alert('Por favor completa todos los campos requeridos (Nombre, Dirección y Teléfono)');
      return;
    }

    // Validar que el teléfono sea un número
    if (isNaN(formData.telephone) || formData.telephone.trim() === '') {
      alert('El teléfono debe ser un número válido');
      return;
    }
    
    try {
      // Preparar los datos para enviar al backend
      const localData = {
        name: formData.name,
        address: formData.address,
        telephone: parseInt(formData.telephone),
        schedule: formData.schedule || '' // Si está vacío, enviar string vacío
      };

      if (isEditMode && editingLocal) {
        // Actualizar local existente
        await updateLocal(editingLocal, localData);
        alert('Local actualizado exitosamente');
        handleCancelEdit(); // Limpiar el formulario y salir del modo edición
      } else {
        // Crear nuevo local
        await createLocal(localData);
        alert('Local registrado exitosamente');
        // Limpiar el formulario después de crear exitosamente
        setFormData({
          name: '',
          address: '',
          telephone: '',
          schedule: ''
        });
      }
    } catch (error) {
      alert(`Error al ${isEditMode ? 'actualizar' : 'registrar'} el local: ` + error.message);
    }
  };

  const handleDeleteLocal = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este local?')) {
      try {
        await deleteLocal(id);
        
        // Si estamos editando el local que se va a eliminar, cancelar la edición
        if (editingLocal === id) {
          handleCancelEdit();
        }
        
        alert('Local eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el local: ' + error.message);
      }
    }
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
      borderTop: isEditMode ? '8px solid #f59e0b' : '8px solid #667eea',
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
      background: loading ? '#9ca3af' : (isEditMode ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #667eea, #764ba2)'),
      color: 'white',
      padding: '18px 32px',
      borderRadius: '12px',
      fontWeight: '700',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '18px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: isEditMode ? '0 10px 15px -3px rgba(245, 158, 11, 0.4)' : '0 10px 15px -3px rgba(102, 126, 234, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: isEditMode ? '16px' : '0'
    },
    cancelButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
      color: 'white',
      padding: '14px 32px',
      borderRadius: '12px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 8px 12px -3px rgba(107, 114, 128, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    editModeIndicator: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      padding: '12px 20px',
      borderRadius: '12px',
      marginBottom: '20px',
      border: '1px solid #fcd34d',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
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
      border: '1px solid rgba(0, 0, 0, 0.05)',
      cursor: 'pointer'
    },
    editingCard: {
      border: '3px solid #f59e0b',
      boxShadow: '0 15px 30px -10px rgba(245, 158, 11, 0.3)'
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
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      color: '#f59e0b',
      backgroundColor: '#fffbeb',
      border: '1px solid #fed7aa',
      padding: '12px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
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
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #fecaca'
    },
    loadingMessage: {
      backgroundColor: '#f0f9ff',
      color: '#0369a1',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #bae6fd'
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
            <div style={styles.formCard} id="form-section">
              <h2 style={styles.sectionTitle}>
                {isEditMode ? (
                  <Edit3 style={{ marginRight: '12px', color: '#f59e0b' }} />
                ) : (
                  <Plus style={{ marginRight: '12px', color: '#667eea' }} />
                )}
                {isEditMode ? 'Editar Local' : 'Registrar Local'}
              </h2>
              
              {/* Indicador de modo edición */}
              {isEditMode && (
                <div style={styles.editModeIndicator}>
                  <Edit3 size={16} />
                  Editando local - Los cambios se guardarán al hacer clic en "Actualizar Local"
                </div>
              )}
              
              {/* Mostrar errores si existen */}
              {error && (
                <div style={styles.errorMessage}>
                  Error: {error}
                </div>
              )}
              
              {/* Mostrar estado de carga */}
              {loading && (
                <div style={styles.loadingMessage}>
                  Procesando...
                </div>
              )}
              
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
                  disabled={loading}
                  onFocus={(e) => e.target.style.borderColor = isEditMode ? '#f59e0b' : '#667eea'}
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
                  disabled={loading}
                  onFocus={(e) => e.target.style.borderColor = isEditMode ? '#f59e0b' : '#667eea'}
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
                  disabled={loading}
                  onFocus={(e) => e.target.style.borderColor = isEditMode ? '#f59e0b' : '#667eea'}
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
                  disabled={loading}
                  onFocus={(e) => e.target.style.borderColor = isEditMode ? '#f59e0b' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={styles.submitButton}
                onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
              >
                {isEditMode ? <Save size={20} /> : <Store size={20} />}
                {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Local' : 'Registrar Local')}
              </button>

              {/* Botón para cancelar edición */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  style={styles.cancelButton}
                  onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                >
                  <X size={18} />
                  Cancelar Edición
                </button>
              )}
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
                    key={local._id} 
                    style={{
                      ...styles.localCard,
                      ...(editingLocal === local._id ? styles.editingCard : {})
                    }}
                    onClick={() => handleEditLocal(local)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = editingLocal === local._id 
                        ? '0 25px 50px -12px rgba(245, 158, 11, 0.4)' 
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = editingLocal === local._id 
                        ? '0 15px 30px -10px rgba(245, 158, 11, 0.3)' 
                        : '0 15px 30px -10px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    <div style={{
                      ...styles.localCardHeader,
                      background: getRandomGradient(index)
                    }}>
                      <Store size={40} color="white" />
                      {editingLocal === local._id && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Edit3 size={16} color="#f59e0b" />
                        </div>
                      )}
                    </div>
                    
                    <div style={styles.localCardBody}>
                      <h3 style={styles.localName}>
                        <Building size={20} color="#667eea" />
                        {local.name}
                        {editingLocal === local._id && (
                          <span style={{
                            fontSize: '12px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            marginLeft: 'auto',
                            fontWeight: 'normal'
                          }}>
                            Editando
                          </span>
                        )}
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
                          Registrado el {new Date(local.createdAt).toLocaleDateString()}
                        </span>
                        <div style={styles.actionButtons}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar que se active el clic de la card
                              handleEditLocal(local);
                            }}
                            style={styles.editButton}
                            disabled={loading}
                            onMouseOver={(e) => {
                              if (!loading) {
                                e.target.style.backgroundColor = '#fbbf24';
                                e.target.style.color = '#ffffff';
                                e.target.style.borderColor = '#f59e0b';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!loading) {
                                e.target.style.backgroundColor = '#fffbeb';
                                e.target.style.color = '#f59e0b';
                                e.target.style.borderColor = '#fed7aa';
                              }
                            }}
                            title="Editar local"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar que se active el clic de la card
                              handleDeleteLocal(local._id);
                            }}
                            style={styles.deleteButton}
                            disabled={loading}
                            onMouseOver={(e) => {
                              if (!loading) {
                                e.target.style.backgroundColor = '#fca5a5';
                                e.target.style.color = '#ffffff';
                                e.target.style.borderColor = '#f87171';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!loading) {
                                e.target.style.backgroundColor = '#fef2f2';
                                e.target.style.color = '#ef4444';
                                e.target.style.borderColor = '#fecaca';
                              }
                            }}
                            title="Eliminar local"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
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