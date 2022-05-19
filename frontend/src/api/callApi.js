import instanceApi from "./backend";
import { isAuthenticated } from "../auth/Auth";

export const braintreePayment = async (userId) => {
  try {
    let response = await instanceApi.get(`/braintree/getToken/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const processPayment = async (userId, data) => {
  try {
    let response = await instanceApi.post(`/braintree/payment/${userId}`, data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createOrder = async (userId, orderData) => {
  try {
    let response = await instanceApi.post(`/order/create/${userId}`, {
      order: orderData,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getCartItems = async (userId) => {
  try {
    let response = await instanceApi.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const allUsers = async (userId) => {
  try {
    let response = await instanceApi.get(`/admin/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const listAllOrders = async (userId) => {
  try {
    let response = await instanceApi.get(`/order/list/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getOrderStatus = async (userId) => {
  try {
    let response = await instanceApi.get(`/order/status/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateOrderStatus = async (userId, orderId, status) => {
  try {
    let response = await instanceApi.put(`/order/${orderId}/status/${userId}`, {
      status,
      orderId,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const purchaseHistory = async (userId) => {
  try {
    let response = await instanceApi.get(`/order/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
