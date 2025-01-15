import React, { useState, useEffect } from "react";
import Pagination from "../../shared/Pagination";
import { getAllOrdersDetailByUserId } from "../../../utils/ApiFunction";

const ReceivedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      try {
        const data = await getAllOrdersDetailByUserId(userId, currentPage, 5);
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateTotalPrice = (products) =>
    products.reduce(
      (total, product) =>
        total +
        product.quantity *
          (product.discountPrice !== null
            ? product.discountPrice
            : product.price),
      0
    );

  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Đơn hàng đã đặt
      </div>
      <table className="table-auto w-full mt-6">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 w-1/12">ID Đơn Hàng</th>
            <th className="border-b border-gray-300 p-3 w-2/12">
              Tên Người Đặt
            </th>
            <th className="border-b border-gray-300 p-3 w-3/12">Email</th>
            <th className="border-b border-gray-300 p-3 w-3/12">Địa Chỉ</th>
            <th className="border-b border-gray-300 p-3 w-2/12">Tổng Tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border-b border-gray-300 p-3">{order.id}</td>
              <td className="border-b border-gray-300 p-3">{order.fullName}</td>
              <td className="border-b border-gray-300 p-3">{order.email}</td>
              <td className="border-b border-gray-300 p-3">{order.address}</td>
              <td className="border-b border-gray-300 p-3">
                {calculateTotalPrice(order.products).toLocaleString()} đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / 5)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ReceivedOrder;
