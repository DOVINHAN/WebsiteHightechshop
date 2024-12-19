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
  const response = await api.get(`/api/getAll/products`, {
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

export async function updateProdcut(
  product_id,
  name,
  description,
  img,
  price,
  sizes,
  colors
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("img", img);
  formData.append("price", price);
  formData.append("sizes", sizes);
  formData.append("colors", colors);
  formData.append("product_id", product_id);

  const response = await api.post(`/api/product/update`, formData);
  return response;
}

export async function deleteProductById(product_id) {
  const formData = new FormData();
  formData.append("product_id", product_id);
  const response = await api.post(`/api/product/delete`, formData);
  return response;
}

// *************
// Category
// *************

export async function createCategory(name) {
  const formData = new FormData();
  formData.append("name", name);

  const response = await api.post(`/api/category/add`, formData);
  return response;
}

export async function getAllCategories() {
  const response = await api.get(`/api/category/getAll`);
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
  const response = await api.get(`/api/category/getByCategoryId`, formData);
  return response;
}

export async function deleteCategoryById(category_id) {
  const formData = new FormData();
  formData.append("category_id", category_id);
  const response = await api.get(`/api/category/delete`, formData);
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

  const response = await api.post(
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

  const response = await api.post(`/api/order/delete`, formData);
  return response;
}
