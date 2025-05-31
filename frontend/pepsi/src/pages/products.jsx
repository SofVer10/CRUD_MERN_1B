import { useState } from 'react';
import { Package, DollarSign, Archive, Plus, Trash2, Edit3, ShoppingCart, Save, X } from 'lucide-react';
import useProducts from '../hooks/useProducts'; // Ajusta la ruta según tu estructura de carpetas

export default function AgregarProducto() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  
  // Nuevo estado para manejar la edición
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para cargar datos del producto en el formulario
  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString()
    });
    setEditingProduct(product);
    setIsEditing(true);
    
    // Scroll suave hacia el formulario
    document.querySelector('[data-form-section]')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: ''
    });
    setEditingProduct(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Por favor completa todos los campos requeridos (Nombre, Precio y Stock)');
      return;
    }

    if (parseFloat(formData.price) < 0 || parseInt(formData.stock) < 0) {
      alert('El precio y stock deben ser valores positivos');
      return;
    }
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      if (isEditing && editingProduct) {
        // Actualizar producto existente
        await updateProduct(editingProduct._id || editingProduct.id, productData);
        alert('Producto actualizado exitosamente');
      } else {
        // Crear nuevo producto
        await createProduct(productData);
        alert('Producto registrado exitosamente');
      }
      
      // Limpiar el formulario después del éxito
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: ''
      });
      setEditingProduct(null);
      setIsEditing(false);
      
    } catch (err) {
      alert(`Error al ${isEditing ? 'actualizar' : 'registrar'} producto: ` + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id);
        
        // Si estamos editando el producto que se está eliminando, cancelar la edición
        if (editingProduct && (editingProduct._id === id || editingProduct.id === id)) {
          handleCancelEdit();
        }
        
        alert('Producto eliminado exitosamente');
      } catch (err) {
        alert('Error al eliminar producto: ' + err.message);
      }
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Agotado', color: 'red' };
    if (stock < 10) return { text: 'Stock Bajo', color: 'yellow' };
    return { text: 'Disponible', color: 'green' };
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #fecaca 0%, #dbeafe 100%)',
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
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '32px',
      borderRadius: '20px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      maxWidth: '1400px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #dc2626, #2563eb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '12px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.2rem',
      fontWeight: '500'
    },
    mainLayout: {
      display: 'flex',
      maxWidth: '1400px',
      width: '100%',
      gap: '40px',
      flexDirection: 'column'
    },
    topSection: {
      display: 'grid',
      gridTemplateColumns: '400px 1fr',
      gap: '40px',
      alignItems: 'start'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      padding: '40px',
      borderTop: isEditing ? '6px solid #f59e0b' : '6px solid #dc2626',
      height: 'fit-content',
      position: 'sticky',
      top: '20px',
      transition: 'border-top-color 0.3s'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    decorativeSection: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '20px',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1586323392840-91d0c7506513?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    },
    decorativeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
      borderRadius: '20px'
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
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '10px'
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa'
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box',
      backgroundColor: '#fafafa',
      resize: 'vertical',
      minHeight: '80px'
    },
    inputGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '24px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px'
    },
    submitButton: {
      flex: 1,
      background: loading ? '#9ca3af' : (isEditing ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #dc2626, #2563eb)'),
      color: 'white',
      padding: '16px 32px',
      borderRadius: '12px',
      fontWeight: '700',
      border: 'none',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontSize: '18px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    cancelButton: {
      background: '#6b7280',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    editingBanner: {
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#92400e'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      marginTop: '32px'
    },
    productCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '28px',
      borderLeft: '6px solid #2563eb',
      transition: 'transform 0.2s, box-shadow 0.2s',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    productCardEditing: {
      borderLeft: '6px solid #f59e0b',
      backgroundColor: '#fffbeb',
      boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.2)'
    },
    productHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    productName: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    productDescription: {
      color: '#6b7280',
      fontSize: '0.95rem',
      lineHeight: '1.5',
      marginBottom: '20px',
      minHeight: '40px'
    },
    productStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '20px'
    },
    productStat: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px'
    },
    productFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb'
    },
    badge: {
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '0.8rem',
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
    badgeRed: {
      backgroundColor: '#fecaca',
      color: '#dc2626'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    editButton: {
      color: '#f59e0b',
      backgroundColor: '#fef3c7',
      border: '1px solid #fed7aa',
      padding: '10px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    deleteButton: {
      color: '#ef4444',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      padding: '10px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    emptyState: {
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '60px 40px',
      textAlign: 'center',
      borderTop: '6px solid #2563eb',
      gridColumn: '1 / -1'
    },
    emptyStateText: {
      color: '#6b7280',
      fontSize: '1.3rem',
      marginBottom: '12px',
      fontWeight: '600'
    },
    emptyStateSubtext: {
      color: '#9ca3af',
      fontSize: '1rem'
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
      zIndex: 10
    },
    clickHint: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      color: '#2563eb',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: '600',
      opacity: 0.7
    }
  };

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;
  const outOfStockProducts = products.filter(product => product.stock === 0).length;

  // Mostrar error si existe
  if (error) {
    console.error('Error en la aplicación:', error);
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Gestión de Productos</h1>
          <p style={styles.subtitle}>Administra tu inventario de productos de forma eficiente y organizada</p>
        </div>

        <div style={styles.mainLayout}>
          <div style={styles.topSection}>
            {/* Formulario */}
            <div style={styles.formCard} data-form-section>
              {loading && (
                <div style={styles.loadingOverlay}>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#6b7280' }}>
                    Procesando...
                  </div>
                </div>
              )}
              
              {isEditing && (
                <div style={styles.editingBanner}>
                  <Edit3 size={20} />
                  Editando: {editingProduct?.name}
                </div>
              )}
              
              <h2 style={styles.sectionTitle}>
                {isEditing ? <Edit3 style={{ marginRight: '12px', color: '#f59e0b' }} /> : <Plus style={{ marginRight: '12px', color: '#dc2626' }} />}
                {isEditing ? 'Editar Producto' : 'Agregar Producto'}
              </h2>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombre del Producto *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  style={styles.input}
                  placeholder="Ej: Laptop HP Pavilion"
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Describe las características del producto..."
                  disabled={loading}
                />
              </div>

              <div style={styles.inputGrid}>
                <div>
                  <label style={styles.label}>Precio ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    style={styles.input}
                    placeholder="0.00"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label style={styles.label}>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    style={styles.input}
                    placeholder="0"
                    disabled={loading}
                  />
                </div>
              </div>

              <div style={isEditing ? styles.buttonGroup : {}}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={styles.submitButton}
                  onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
                  disabled={loading}
                >
                  {isEditing ? <Save size={20} /> : <Package size={20} />}
                  {loading ? (isEditing ? 'Actualizando...' : 'Registrando...') : (isEditing ? 'Actualizar Producto' : 'Registrar Producto')}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={styles.cancelButton}
                    onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
                    disabled={loading}
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                )}
              </div>
            </div>

            {/* Sección Decorativa y Estadísticas */}
            <div>
              <div style={styles.decorativeSection}>
                <div style={styles.decorativeOverlay}></div>
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <ShoppingCart size={80} color="white" style={{ marginBottom: '20px' }} />
                  <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    Gestión Inteligente
                  </h3>
                </div>
              </div>

              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <Package size={32} color="#2563eb" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{totalProducts}</h3>
                  <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Total Productos</p>
                </div>
                <div style={styles.statCard}>
                  <DollarSign size={32} color="#10b981" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>${totalValue.toFixed(2)}</h3>
                  <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Valor Total</p>
                </div>
                <div style={styles.statCard}>
                  <Archive size={32} color="#f59e0b" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{lowStockProducts}</h3>
                  <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Stock Bajo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Productos */}
          <div>
            <h2 style={styles.sectionTitle}>
              <Archive style={{ marginRight: '12px', color: '#2563eb' }} />
              Productos Registrados ({products.length})
            </h2>
            
            {loading && products.length === 0 ? (
              <div style={styles.productGrid}>
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '1.3rem', color: '#6b7280', marginBottom: '12px' }}>
                    Cargando productos...
                  </div>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div style={styles.productGrid}>
                <div style={styles.emptyState}>
                  <Package style={{ width: '80px', height: '80px', color: '#9ca3af', margin: '0 auto 24px' }} />
                  <p style={styles.emptyStateText}>No hay productos registrados</p>
                  <p style={styles.emptyStateSubtext}>Usa el formulario para agregar tu primer producto al inventario</p>
                </div>
              </div>
            ) : (
              <div style={styles.productGrid}>
                {products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  const createdDate = product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A';
                  const isCurrentlyEditing = editingProduct && (editingProduct._id === product._id || editingProduct.id === product.id);
                  
                  return (
                    <div 
                      key={product._id || product.id} 
                      style={{
                        ...styles.productCard,
                        ...(isCurrentlyEditing ? styles.productCardEditing : {})
                      }}
                      onClick={() => handleEditProduct(product)}
                      onMouseOver={(e) => {
                        if (!isCurrentlyEditing) {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isCurrentlyEditing) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                    >
                      
                      
                      <div style={styles.productHeader}>
                        <div style={{ flex: 1 }}>
                          <h3 style={styles.productName}>
                            <Package size={24} color={isCurrentlyEditing ? "#f59e0b" : "#2563eb"} />
                            {product.name}
                          </h3>
                          
                          <p style={styles.productDescription}>
                            {product.description || 'Sin descripción disponible'}
                          </p>
                          
                          <div style={styles.productStats}>
                            <div style={styles.productStat}>
                              <DollarSign size={18} color="#10b981" />
                              <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                            <div style={styles.productStat}>
                              <Archive size={18} color="#6b7280" />
                              <span style={{ fontWeight: '600' }}>
                                {product.stock} unidades
                              </span>
                            </div>
                          </div>
                          
                          <div style={styles.productFooter}>
                            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                              Registrado: {createdDate}
                            </span>
                            <span style={{
                              ...styles.badge,
                              ...(stockStatus.color === 'green' ? styles.badgeGreen : 
                                  stockStatus.color === 'yellow' ? styles.badgeYellow : styles.badgeRed)
                            }}>
                              {stockStatus.text}
                            </span>
                          </div>
                        </div>
                        
                        <div style={styles.actionButtons}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProduct(product);
                            }}
                            style={styles.editButton}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#fed7aa';
                              e.target.style.color = '#d97706';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#fef3c7';
                              e.target.style.color = '#f59e0b';
                            }}
                            title="Editar producto"
                            disabled={loading}
                          >
                            <Edit3 size={16} />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(product._id || product.id);
                            }}
                            style={styles.deleteButton}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#fca5a5';
                              e.target.style.color = '#ffffff';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#fef2f2';
                              e.target.style.color = '#ef4444';
                            }}
                            title="Eliminar producto"
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}