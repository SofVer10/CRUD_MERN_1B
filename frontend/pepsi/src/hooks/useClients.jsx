// hooks/useClients.js
import { useState } from 'react';

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL base de tu API - ajusta según tu configuración
  const API_BASE_URL = '/api/clients'; // Cambia por tu URL

  // Obtener todos los clientes
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Error al obtener los clientes');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo cliente
  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      
      if (!response.ok) throw new Error('Error al crear el cliente');
      
      // Recargar la lista de clientes después de crear uno nuevo
      await fetchClients();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error creating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cliente
  const updateClient = async (id, clientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      
      if (!response.ok) throw new Error('Error al actualizar el cliente');
      
      await fetchClients();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error updating client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cliente
  const deleteClient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error al eliminar el cliente');
      
      await fetchClients();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting client:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  };
};

export default useClients;