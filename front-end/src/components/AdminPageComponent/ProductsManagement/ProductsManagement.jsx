import React, { useState } from "react";
import img1 from "../../../assets/productsDummyData/ip25.jpg";
import img2 from "../../../assets/productsDummyData/ip26.jpg";
import img3 from "../../../assets/productsDummyData/ip27.jpg";
import img4 from "../../../assets/productsDummyData/ip28.jpg";
import img5 from "../../../assets/productsDummyData/ip29.jpg";
import Pagination from "../../shared/Pagination";

const ProductsManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      img: img1,
      name: "iPhone 14",
      description: "Điện thoại thông minh mới nhất của Apple.",
      price: 25000000,
    },
    {
      id: 2,
      img: img2,
      name: "Samsung Galaxy S23",
      description: "Điện thoại flagship mạnh mẽ của Samsung.",
      price: 22000000,
    },
    {
      id: 3,
      img: img3,
      name: "Xiaomi Mi 13",
      description: "Hiệu năng mạnh mẽ với giá cả phải chăng.",
      price: 15000000,
    },
    {
      id: 4,
      img: img4,
      name: "Oppo Find X5",
      description: "Điện thoại camera đẹp và thiết kế hiện đại.",
      price: 18000000,
    },
    {
      id: 5,
      img: img5,
      name: "Vivo V27",
      description: "Sản phẩm tầm trung với nhiều tính năng nổi bật.",
      price: 12000000,
    },
  ]);

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: products.length + 1,
      img: formData.get("img"),
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseInt(formData.get("price")),
    };
    setProducts([...products, newProduct]);
    setAddProductModalOpen(false);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProduct = {
      ...selectedProduct,
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseInt(formData.get("price")),
    };
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setUpdateProductModalOpen(false);
  };

  const handleDeleteProduct = () => {
    setProducts(
      products.filter((product) => product.id !== selectedProduct.id)
    );
    setDeleteProductModalOpen(false);
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý sản phẩm
      </div>

      {/* Search bar và nút thêm sản phẩm */}
      <h1 className="mb-3 font-semibold">Tìm sản phẩm:</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Nhập từ khóa"
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary"
        />
        <div className="pl-10">
          <button
            onClick={() => setAddProductModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 w-1/12">Ảnh</th>
            <th className="border-b border-gray-300 p-3 w-2/12">
              Tên sản phẩm
            </th>
            <th className="border-b border-gray-300 p-3 w-4/12">Miêu tả</th>
            <th className="border-b border-gray-300 p-3 w-2/12">Giá</th>
            <th className="border-b border-gray-300 p-3 w-3/12">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b border-gray-300 p-3">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="border-b border-gray-300 p-3">{product.name}</td>
              <td className="border-b border-gray-300 p-3">
                {product.description}
              </td>
              <td className="border-b border-gray-300 p-3">
                {product.price.toLocaleString()} đ
              </td>
              <td className="border-b border-gray-300 p-3">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setUpdateProductModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setDeleteProductModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 flex justify-center">
        <Pagination />
      </div>

      {/* Add Product */}
      {isAddProductModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setAddProductModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Thêm sản phẩm</h3>
            </div>
            <form onSubmit={handleAddProduct} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Tên sản phẩm
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                  Miêu tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-1">
                  Giá
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setAddProductModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Update Product */}
      {isUpdateProductModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setUpdateProductModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Cập nhật danh mục</h3>
            </div>
            <form onSubmit={handleUpdateProduct} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Tên sản phẩm
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                  Miêu tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-1">
                  Giá
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setUpdateProductModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Product */}
      {isDeleteProductModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setDeleteProductModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Xóa danh mục</h3>
            </div>
            <div className="p-4">
              <p>
                Bạn có chắc chắn muốn xóa danh mục{" "}
                <strong>{selectedProduct?.name}</strong> không?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setDeleteProductModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
