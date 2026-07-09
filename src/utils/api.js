import { API_BASE } from './constants';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;
  const config = {
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  const response = await fetch(url, config);
  
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage = data?.error || data?.message || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return data;
}

// Products API
export async function getProducts() {
  return request('products.php');
}

export async function createProduct(formData) {
  return request('products.php', {
    method: 'POST',
    body: formData,
    headers: {},
  });
}

export async function updateProduct(id, formData) {
  formData.append('_method', 'PUT');
  return request(`products.php?id=${id}`, {
    method: 'POST',
    body: formData,
    headers: {},
  });
}

export async function deleteProduct(id) {
  return request(`products.php?id=${id}`, {
    method: 'DELETE',
  });
}

// Auth API
export async function login(username, password) {
  return request('auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function logout() {
  return request('auth.php?action=logout', {
    method: 'POST',
  });
}

export async function checkAuth() {
  return request('auth.php?action=check');
}

// Orders API
export async function createOrder(orderData) {
  return request('orders.php', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrders() {
  return request('orders.php');
}

export async function updateOrderStatus(id, status) {
  return request(`orders.php?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// Payment API (Razorpay)
export async function createRazorpayOrder(amount, currency = 'INR') {
  return request('razorpay.php?action=create_order', {
    method: 'POST',
    body: JSON.stringify({ amount, currency }),
  });
}

export async function verifyRazorpayPayment(paymentData) {
  return request('razorpay.php?action=verify', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
}
