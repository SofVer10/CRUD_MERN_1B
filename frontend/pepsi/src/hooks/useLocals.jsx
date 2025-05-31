import { useState, useEffect } from 'react';

const useLocals = () => {
  const [locals, setLocals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de tu API - ajusta según tu configuración
  const API_URL = '/api/locals'; // Cambia el puerto si es necesario

  // Obtener todos los locales
  const getLocals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setLocals(data);
    } catch (error) {
      console.error('Error al obtener locales:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo local
  const createLocal = async (localData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Recargar la lista de locales después de crear uno nuevo
      await getLocals();
      
      return result;
    } catch (error) {
      console.error('Error al crear local:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un local existente
  const updateLocal = async (id, localData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Recargar la lista de locales después de actualizar
      await getLocals();
      
      return result;
    } catch (error) {
      console.error('Error al actualizar local:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un local
  const deleteLocal = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Recargar la lista de locales después de eliminar
      await getLocals();
      
      return result;
    } catch (error) {
      console.error('Error al eliminar local:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Cargar locales al montar el componente
  useEffect(() => {
    getLocals();
  }, []);

  return {
    // Estados
    locals,
    loading,
    error,
    
    // Métodos
    getLocals,
    createLocal,
    updateLocal,
    deleteLocal
  };
};

export default useLocals;