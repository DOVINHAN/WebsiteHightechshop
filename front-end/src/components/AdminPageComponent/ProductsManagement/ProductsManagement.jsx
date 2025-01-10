import React, { useEffect, useState } from "react";
import Pagination from "../../shared/Pagination";
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from "../../../utils/ApiFunction";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [colors, setColors] = useState([]); // State to store the list of colors
  const [newColor, setNewColor] = useState(""); // State to hold the new color
  const [newSize, setNewSize] = useState("");

  const handleColorAdd = (e) => {
    if (e.key === "Enter" && newColor.trim()) {
      setFormData({
        ...formData,
        colors: [...formData.colors, newColor.trim()],
      });
      setNewColor(""); // Clear input after adding
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    images: [],
    colors: [],
    sizes: [],
  });

  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(currentPage, pageSize);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(filePreviews); // Cập nhật ảnh preview

    // Chuyển đổi các file ảnh thành base64
    const readerPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Khi đọc xong, trả về kết quả base64
        reader.onerror = reject; // Xử lý lỗi
        reader.readAsDataURL(file); // Đọc file dưới dạng base64
      });
    });

    // Lưu base64 vào formData sau khi tất cả các ảnh đã được đọc thành công
    Promise.all(readerPromises)
      .then((base64Images) => {
        // Lưu các ảnh base64 vào formData
        setFormData((prevData) => ({
          ...prevData,
          images: base64Images, // Cập nhật ảnh vào formData
        }));
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Using the current formData state directly instead of FormData from the event
    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      discountPrice: parseInt(formData.discountPrice),
      images: formData.images.filter(
        (image) => image !== null && image !== undefined
      ),
      colors: formData.colors, // Colors stored in the formData state
      sizes: formData.sizes, // Sizes stored in the formData state
    };

    // Assuming addProduct is an API call function
    const response = await addProduct(newProduct);

    if (response.message === "Product added successfully.") {
      setProducts([...products, response.newProduct]);
      setAddProductModalOpen(false);
    }
  };

  const handleSizeAdd = (e) => {
    if (e.key === "Enter" && newSize.trim()) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, newSize.trim()],
      });
      setNewSize(""); // Clear input after adding
    }
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((item) => item !== color),
    });
  };

  const handleRemoveSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((item) => item !== size),
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...selectedProduct,
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      discountPrice: parseInt(formData.discountPrice),
      images: formData.images.filter(
        (image) => image !== null && image !== undefined
      ),
      colors: formData.colors,
      sizes: formData.sizes,
    };

    try {
      console.log(updatedProduct);
      const response = await updateProduct(selectedProduct.id, updatedProduct);

      if (response.message === "Product updated successfully.") {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setUpdateProductModalOpen(false);
        alert("Cập nhật sản phẩm thành công!"); // Thông báo thành công
      } else {
        console.error("Failed to update product:", response.message);
        alert("Cập nhật sản phẩm thất bại. Vui lòng thử lại."); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Cập nhật sản phẩm thất bại. Vui lòng thử lại."); // Thông báo lỗi
    }
  };

  const handleDeleteProduct = async () => {
    try {
      // Assuming you have an API function to delete the product
      const response = await deleteProduct(selectedProduct.id);

      if (response.message === "Product deleted successfully.") {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct.id)
        );
        setDeleteProductModalOpen(false);
      } else {
        console.error("Failed to delete product:", response.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
                  src={product.images[0]}
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
                    setFormData({
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      discountPrice: product.discountPrice,
                      images: product.images,
                      colors: product.colors,
                      sizes: product.sizes,
                    }); // Set formData with selected product details
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
        <Pagination
          totalItems={totalProducts}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Product */}
      {isAddProductModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setAddProductModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md max-h-[600px] overflow-y-auto"
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.description}
                  onChange={handleInputChange}
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
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="discountPrice"
                  className="block font-medium mb-1"
                >
                  Giá giảm
                </label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="images" className="block font-medium mb-1">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                <div className="flex gap-2 mt-2">
                  {imagePreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="colors" className="block font-medium mb-1">
                  Màu sắc
                </label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={handleColorAdd}
                  placeholder="Nhập màu sắc và nhấn Enter"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  {formData.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        style={{ backgroundColor: color }}
                        className="w-6 h-6 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-red-500 text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="sizes" className="block font-medium mb-1">
                  Kích cỡ
                </label>
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  onKeyDown={handleSizeAdd}
                  placeholder="Nhập kích cỡ và nhấn Enter"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  {formData.sizes.map((size, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-24 h-10 flex items-center justify-center bg-gray-200 rounded-md">
                        {size}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="text-red-500 text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
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
            className="relative bg-white rounded-lg shadow w-full max-w-md max-h-[600px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Chỉnh sửa sản phẩm</h3>
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.description}
                  onChange={handleInputChange}
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
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="discountPrice"
                  className="block font-medium mb-1"
                >
                  Giá giảm
                </label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="images" className="block font-medium mb-1">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                <div className="flex gap-2 mt-2">
                  {imagePreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="colors" className="block font-medium mb-1">
                  Màu sắc
                </label>
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={handleColorAdd}
                  placeholder="Nhập màu sắc và nhấn Enter"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  {formData.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        style={{ backgroundColor: color }}
                        className="w-6 h-6 rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-red-500 text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="sizes" className="block font-medium mb-1">
                  Kích cỡ
                </label>
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  onKeyDown={handleSizeAdd}
                  placeholder="Nhập kích cỡ và nhấn Enter"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <div className="flex gap-2 mt-2">
                  {formData.sizes.map((size, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-24 h-10 flex items-center justify-center bg-gray-200 rounded-md">
                        {size}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="text-red-500 text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
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
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
            className="relative bg-white rounded-lg shadow w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Xóa sản phẩm</h3>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
            <div className="mt-4">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Xóa
              </button>
              <button
                onClick={() => setDeleteProductModalOpen(false)}
                className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
