import React from "react";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../../shared/Pagination";

const UserMangement = () => {
  // Dummy data cho người dùng
  const users = [
    { id: 1, name: "Nguyễn Văn A", contact: "nguyenvana@example.com" },
    { id: 2, name: "Trần Thị B", contact: "tranthib@example.com" },
    { id: 3, name: "Lê Văn C", contact: "0901234567" },
    { id: 4, name: "Phạm Thị D", contact: "phamthid@example.com" },
    { id: 5, name: "Đặng Văn E", contact: "0923456789" },
  ];

  // Xử lý các hành động
  const handleEdit = (id) => {
    alert(`Chỉnh sửa người dùng với ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Xóa người dùng với ID: ${id}`);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý người dùng
      </div>

      {/* Search bar */}
      <h1 className="mb-3 font-semibold">Tìm người dùng:</h1>
      <div className="group hidden sm:block">
        <input
          type="text"
          placeholder="Nhập từ khóa"
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
        />
      </div>

      {/* Table hiển thị danh sách người dùng */}
      <table className="table-auto w-full border-collapse border-spacing-y-4 border-spacing-x-2 mt-6">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 text-left w-1/3">
              Tên người dùng
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/3">
              Email/Số điện thoại
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Tên người dùng */}
              <td className="border-b border-gray-300 p-3">{user.name}</td>
              {/* Email/Số điện thoại */}
              <td className="border-b border-gray-300 p-3">{user.contact}</td>
              {/* Hành động */}
              <td className="border-b border-gray-300 p-3">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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

export default UserMangement;
