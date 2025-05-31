import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de tu API - ajusta según tu configuración
  const API_URL = '/api/products'; // Cambia el puerto si es necesario

  // Obtener todos los productos
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener productos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo producto
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear producto');
      }
      
      const result = await response.json();
      // Refrescar la lista de productos después de crear uno nuevo
      await getProducts();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al crear producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }
      
      const result = await response.json();
      // Refrescar la lista de productos después de actualizar
      await getProducts();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }
      
      const result = await response.json();
      // Refrescar la lista de productos después de eliminar
      await getProducts();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error al eliminar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    loading,
    error,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;