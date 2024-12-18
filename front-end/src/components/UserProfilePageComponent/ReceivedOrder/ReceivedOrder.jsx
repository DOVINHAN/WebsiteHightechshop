import React from "react";
import img1 from "../../../assets/productsDummyData/ip25.jpg";
import img2 from "../../../assets/productsDummyData/ip26.jpg";
import img3 from "../../../assets/productsDummyData/ip27.jpg";
import img4 from "../../../assets/productsDummyData/ip28.jpg";
import img5 from "../../../assets/productsDummyData/ip29.jpg";
import Pagination from "../../shared/Pagination";

const bills = [
  {
    id: 1,
    img: img1,
    recipient: "Nguyễn Văn A",
    address: "123 Lê Lợi, TP HCM",
    phone: "0901234567",
    total: 1500000,
  },
  {
    id: 2,
    img: img2,
    recipient: "Trần Thị B",
    address: "456 Hùng Vương, Đà Nẵng",
    phone: "0909876543",
    total: 2000000,
  },
  {
    id: 3,
    img: img3,
    recipient: "Lê Văn C",
    address: "789 Trần Phú, Hà Nội",
    phone: "0912345678",
    total: 1200000,
  },
  {
    id: 4,
    img: img4,
    recipient: "Phạm Thị D",
    address: "321 Nguyễn Huệ, Cần Thơ",
    phone: "0938765432",
    total: 2500000,
  },
  {
    id: 5,
    img: img5,
    recipient: "Đặng Văn E",
    address: "654 Võ Văn Kiệt, Hải Phòng",
    phone: "0923456789",
    total: 1800000,
  },
];

const ReceivedOrder = () => {
  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Đơn hàng đã đặt
      </div>
      <table className="table-auto w-full border-collapse border-spacing-y-4 border-spacing-x-2">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 text-left w-1/12">
              Ảnh
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-3/12">
              Tên người nhận
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-3/12">
              Địa chỉ
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/12">
              Số điện thoại
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-2/12">
              Tổng số tiền
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-2/12">
              Tình trạng
            </th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              {/* Ảnh */}
              <td className="border-b border-gray-300 p-3">
                <img
                  src={bill.img}
                  alt={bill.recipient}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              {/* Tên người nhận */}
              <td className="border-b border-gray-300 p-3">{bill.recipient}</td>
              {/* Địa chỉ */}
              <td className="border-b border-gray-300 p-3">{bill.address}</td>
              {/* Số điện thoại */}
              <td className="border-b border-gray-300 p-3">{bill.phone}</td>
              {/* Tổng số tiền */}
              <td className="border-b border-gray-300 p-3">
                {bill.total.toLocaleString()} đ
              </td>
              <td className="border-b border-gray-300 p-3">Đã đặt</td>
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

export default ReceivedOrder;
