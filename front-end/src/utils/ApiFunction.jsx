import axios from "axios";
import { use } from "react";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
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

export async function addProduct(productData) {
  try {
    console.log(productData);
    const response = await api.post(`/addProduct`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return { message: "Error adding product" };
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/getProductById/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return { message: "Error" };
  }
}

export async function getProductInCartByUserId(id) {
  try {
    const response = await api.get(`/getProductInCartByUserId/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return { message: "Error" };
  }
}

export async function addProdcutIntoCart(cartItem) {
  try {
    console.log(cartItem);
    const response = await api.post(`/addProdcutIntoCart`, cartItem);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { message: "Error adding product to cart." };
  }
}

export async function getFourRelatedProduct(id) {
  try {
    console.log(id);
    const response = await api.get(`/getFourRelatedProduct/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return { message: "Error" };
  }
}

export async function getAllProducts(page = 1, pageSize = 5) {
  try {
    const response = await api.get(
      `/getAllProducts?page=${page}&pageSize=${pageSize}`
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch products.");
    }
  } catch (error) {
    console.error("Error fetching products:", error.message || error);
    return { products: [], totalProducts: 0, currentPage: 1, totalPages: 1 };
  }
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
  try {
    const response = await api.get("/discountProductsForHomePage");
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch discounted products."
      );
    }
  } catch (error) {
    console.error(
      "Error fetching discounted products:",
      error.message || error
    );
    return [];
  }
}

export async function getBestSellingProductsForHomePage() {
  try {
    const response = await api.get("/bestSellingProductsForHomePage");
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch best-selling products."
      );
    }
  } catch (error) {
    console.error(
      "Error fetching best-selling products:",
      error.message || error
    );
    return [];
  }
}

export async function getExploreProductsForHomePage() {
  try {
    const response = await api.get("/exploreProductsForHomePage");
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch explore products."
      );
    }
  } catch (error) {
    console.error("Error fetching explore products:", error.message || error);
    return [];
  }
}

export async function updateProduct(id, updatedProduct) {
  try {
    const response = await api.post(`/updateProduct/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.message || error);
    throw error;
  }
}

export async function deleteProductById(productId) {
  try {
    const response = await api.delete(`/deleteProduct/${productId}`);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error.message || error);
    throw error;
  }
}

// *************
// Category
// *************

export async function addCategory(categoryData) {
  try {
    const response = await api.post(`/addCategory`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    return { message: "Error adding category" };
  }
}

export async function getAllCategoriesByKeyword(keyword) {
  const formData = new FormData();
  formData.append("keyword", keyword);
  const response = await api.get(`/api/category/getAll`, formData);
  return response;
}

export async function updateCategory(updatedCategory) {
  try {
    const response = await api.post("/updateCategory", updatedCategory);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error.message || error);
    throw error;
  }
}

export async function deleteCategoryById(categoryId) {
  try {
    const response = await api.delete(`/deleteCategory/${categoryId}`);
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to delete category."
      );
    } else {
      throw new Error("Network error or server is not responding.");
    }
  }
}

export async function getAllCategories() {
  try {
    const response = await api.get("/categories");
    if (response.status === 200) {
      return response.data.categories;
    } else {
      throw new Error(response.data.message || "Failed to fetch categories.");
    }
  } catch (error) {
    console.error("Error fetching categories:", error.message || error);
    return [];
  }
}

// *************
// OrderDetail
// *************

export async function addorderdetail(orderData) {
  const response = await api.post(`/addorderdetail`, orderData);
  return response;
}

export async function getAllOrdersDetail(page, pageSize) {
  const response = await api.get(
    `/getAllOrdersDetail?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
}

export async function getAllOrdersDetailByUserId(userId) {
  const response = await api.get(`/getAllOrdersDetailByUserId/${userId}`);
  return response.data;
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

export async function getAllUser(page = 1, pageSize = 5) {
  try {
    const response = await api.get(
      `/getAllUsers?page=${page}&pageSize=${pageSize}`
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch users.");
    }
  } catch (error) {
    console.error("Error fetching users:", error.message || error);
    return { users: [], totalUsers: 0, currentPage: 1, totalPages: 1 };
  }
}

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });

    if (response.status === 200) {
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(localStorage.getItem("user"));
      return user;
    } else {
      throw new Error(response.data.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error("Error during login:", error.message || error);
    return null;
  }
}

export async function register(name, email, phoneNumber, address, password) {
  try {
    const response = await api.post("/register", {
      name,
      email,
      phoneNumber,
      address,
      password,
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to register user.");
    }
  } catch (error) {
    console.error("Error registering user:", error.message || error);
    return null;
  }
}

export async function logout() {
  try {
    localStorage.removeItem("user");
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error during logout:", error.message || error);
  }
}

export async function updateUser(updatedUser) {
  try {
    const response = await api.post(`/updateUser`, updatedUser);
    return response;
  } catch (error) {
    console.error("Error updating user:", error.message || error);
    throw error;
  }
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

export async function deleteUserById(userId) {
  try {
    const response = await api.delete(`/deleteUser/${userId}`);
    return response;
  } catch (error) {
    console.error("Error deleting user:", error.message || error);
    throw error;
  }
}
