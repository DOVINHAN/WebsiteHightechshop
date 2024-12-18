import React from "react";
import Button from "../../shared/Button";
import img1 from "../../../assets/productsDummyData/ip25.jpg";
import img2 from "../../../assets/productsDummyData/ip26.jpg";
import img3 from "../../../assets/productsDummyData/ip27.jpg";
import img4 from "../../../assets/productsDummyData/ip28.jpg";
import img5 from "../../../assets/productsDummyData/ip29.jpg";
import Pagination from "../../shared/Pagination";

const ProductsManagement = () => {
  // Dummy data cho sản phẩm
  const products = [
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
  ];

  // Xử lý các hành động
  const handleEdit = (id) => {
    alert(`Chỉnh sửa sản phẩm với ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa sản phẩm với ID: ${id}`);
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý sản phẩm
      </div>

      {/* Search bar và nút thêm sản phẩm */}
      <h1 className="mb-3 font-semibold">Tìm sản phẩm:</h1>
      <div className="flex items-center">
        <div className="group hidden sm:block">
          <input
            type="text"
            placeholder="Nhập từ khóa"
            className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
          />
        </div>
        <div className="pl-10">
          <Button
            bgColor="bg-primary"
            text={"Thêm sản phẩm"}
            textColor={"text-white"}
          />
        </div>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full border-collapse border-spacing-y-4 border-spacing-x-2 mt-6">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 text-left w-2/12">
              Ảnh
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/12">
              Tên sản phẩm
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-3/12">
              Miêu tả
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/5">
              Giá
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-2/5">
              Hành động
            </th>
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
                  onClick={() => handleEdit(product.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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
    </div>
  );
};

export default ProductsManagement;
