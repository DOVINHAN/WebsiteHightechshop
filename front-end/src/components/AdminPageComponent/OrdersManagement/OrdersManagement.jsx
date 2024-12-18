import React, { useState } from "react";
import img1 from "../../../assets/productsDummyData/ip25.jpg";
import img2 from "../../../assets/productsDummyData/ip26.jpg";
import img3 from "../../../assets/productsDummyData/ip27.jpg";
import img4 from "../../../assets/productsDummyData/ip28.jpg";
import img5 from "../../../assets/productsDummyData/ip29.jpg";
import Pagination from "../../shared/Pagination";

const OrdersManagement = () => {
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
  return (
    <div className="w-full max-w-5xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý đơn hàng
      </div>

      {/* Search bar và nút thêm sản phẩm */}
      <h1 className="mb-3 font-semibold">Tìm đơn hàng:</h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Nhập từ khóa"
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary"
        />
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

export default OrdersManagement;
