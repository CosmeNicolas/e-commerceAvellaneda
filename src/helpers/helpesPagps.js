import clienteAxios, { configHeaders } from './axios';

export const crearPagoMercadoPago = async (producto, userId) => {
  try {
    const items = [{
      nombre: producto.nombreProducto,
      precio: producto.precio,
      cantidad: 1
    }];

    const response = await clienteAxios.post(
      '/api/pagos/crear-pago',
      { items, userId },
      configHeaders
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear pago:', error);
    throw error;
  }
};

// Función para cargar el SDK de Mercado Pago
export const loadMercadoPago = () => {
  return new Promise((resolve) => {
    if (window.MercadoPago) return resolve();
    
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};