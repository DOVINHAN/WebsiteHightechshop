import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// *************
// PRODUCT
// *************

export async function createProduct(
  name,
  description,
  img,
  price,
  sizes,
  colors,
  quantity,
  category_id
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("img", img);
  formData.append("price", price);
  formData.append("sizes", sizes);
  formData.append("quantity", quantity);
  formData.append("colors", colors);
  formData.append("category_id", category_id);

  const response = await api.post(`/api/product/add`, formData);
  return response;
}

export async function getAllProducts(pageNo = 0, pageSize = 8) {
  const response = await api.get(`/api/product/list`, {
    params: { pageNo, pageSize },
  });
  return response.data;
}

export async function getProductsByKeyword(keyword, pageNo = 0, pageSize = 8) {
  const response = await api.get(
    `/api/getProductById/${encodeURIComponent(keyword)}`,
    {
      params: { pageNo, pageSize },
    }
  );
  return response.data;
}

export async function getProductsByCategory(
  category_id,
  pageNo = 0,
  pageSize = 8
) {
  const response = await api.get(`/api/getByCategory/${category_id}`, {
    params: { pageNo, pageSize },
  });
  return response.data;
}

export async function getDiscountProductsForHomePage() {
  const response = await api.get(`/api/getDiscountProductsForHomePage`);
  return response.data;
}

export async function getDiscountProductForHomePage() {
  const response = await api.get(`/api/product/discount-list`);
  return response.data;
}

export async function updateProdcut(
  product_id,
  name,
  description,
  img,
  price,
  sizes,
  colors,
  discount_price
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("img", img);
  formData.append("price", price);
  formData.append("discount_price", discount_price);
  formData.append("sizes", sizes);
  formData.append("colors", colors);
  formData.append("product_id", product_id);

  const response = await api.post(`/api/product/update`, formData);
  return response;
}

export async function deleteProductById(product_id) {
  const formData = new FormData();
  formData.append("product_id", product_id);
  const response = await api.delete(`/api/product/delete/{id}`, formData);
  return response;
}

// *************
// Category
// *************

export async function createCategory(name) {
  const formData = new FormData();
  formData.append("name", name);

  const response = await api.post(`/api/categories/add`, formData);
  return response;
}

export async function getAllCategories() {
  const response = await api.get(`/api/categories/list`);
  return response;
}

export async function getAllCategoriesByKeyword(keyword) {
  const formData = new FormData();
  formData.append("keyword", keyword);
  const response = await api.get(`/api/category/getAll`, formData);
  return response;
}

export async function updateCategory(category_id) {
  const formData = new FormData();
  formData.append("category_id", category_id);
  const response = await api.get(`/api/categories/detail/{id}`, formData);
  return response;
}

export async function deleteCategoryById(category_id) {
  const formData = new FormData();
  formData.append("category_id", category_id);
  const response = await api.delete(`/api/categories/delete/{id}`, formData);
  return response;
}

// *************
// OrderDetail
// *************

export async function createOderDetail(productIdList) {
  const formData = new FormData();
  formData.append("productIdList", productIdList);

  const response = await api.post(`/api/orderDetail/add`, formData);
  return response;
}

export async function getOrderDetailByOrderId(order_id) {
  const formData = new FormData();
  formData.append("order_id", order_id);

  const response = await api.post(
    `/api/orderDetail/getOrderDetailByOrderId`,
    formData
  );
  return response;
}

export async function getOrderDetailByUserId(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);

  const response = await api.post(
    `/api/orderDetail/getOrderDetailByUserId`,
    formData
  );
  return response;
}

export async function updateOrderDetail() {}

export async function deleteOrderDetaulById(orderDetail_id) {
  const formData = new FormData();
  formData.append("orderDetail_id", orderDetail_id);

  const response = await api.delete(
    `/api/orderDetail/deleteOrderDetaulById`,
    formData
  );
  return response;
}

// *************
// order
// *************

export async function createOrder(
  name,
  address,
  phone,
  payment,
  total_price,
  user_id
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("payment", payment);
  formData.append("total_price", total_price);
  formData.append("user_id", user_id);

  const response = await api.post(`/api/order/add`, formData);
  return response;
}

export async function getOrderByUserId(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);

  const response = await api.post(`/api/order/add`, formData);
  return response;
}

export async function updateOrder() {}

export async function deleteOrderById(order_id) {
  const formData = new FormData();
  formData.append("order_id", order_id);

  const response = await api.delete(`/api/order/delete`, formData);
  return response;
}

// *************
// user
// *************

export async function login(email, password) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await api.post(`/api/user/login`, formData);
  return response;
}

export async function register(name, email, password) {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
}

export async function updateUser(user_id, name, password) {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("name", name);
  formData.append("password", password);

  const response = await api.post(`/api/user/update`, formData);
  return response;
}

export async function getUserByUserId(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);

  const response = await api.post(`/api/user/getUserByUserId`, formData);
  return response;
}

export async function getUserByUserEmail(email) {
  const formData = new FormData();
  formData.append("email", email);

  const response = await api.post(`/api/user/getUserByUserEmail`, formData);
  return response;
}

export async function deleteUserById(user_id) {
  const formData = new FormData();
  formData.append("user_id", user_id);

  const response = await api.delete(`/api/user/deleteUserById`, formData);
  return response;
}
