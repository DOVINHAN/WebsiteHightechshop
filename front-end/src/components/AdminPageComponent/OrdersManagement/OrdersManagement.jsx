import React, { useState, useEffect } from "react";
import Pagination from "../../shared/Pagination";
import { getAllOrdersDetail } from "../../../utils/ApiFunction";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersDetail(currentPage, pageSize);
        setOrders(data.orders);
        setTotalOrders(data.totalOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]);

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
    <div className="w-full max-w-5xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý đơn hàng
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
          totalItems={totalOrders}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrdersManagement;
