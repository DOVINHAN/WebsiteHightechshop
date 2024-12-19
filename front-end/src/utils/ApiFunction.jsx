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
  category_id
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("img", img);
  formData.append("price", price);
  formData.append("sizes", sizes);
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
