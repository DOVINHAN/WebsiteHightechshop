import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../../shared/Pagination";

const UserMangement = () => {
  const users = [
    { id: 1, name: "Nguyễn Văn A", contact: "nguyenvana@example.com" },
    { id: 2, name: "Trần Thị B", contact: "tranthib@example.com" },
    { id: 3, name: "Lê Văn C", contact: "0901234567" },
    { id: 4, name: "Phạm Thị D", contact: "phamthid@example.com" },
    { id: 5, name: "Đặng Văn E", contact: "0923456789" },
  ];

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...selectedUser,
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseInt(formData.get("price")),
    };
    setProUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setUpdateUserModalOpen(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((User) => User.id !== selectedUser.id));
    setDeleteUserModalOpen(false);
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
              <td className="border-b border-gray-300 p-3">{user.name}</td>
              <td className="border-b border-gray-300 p-3">{user.contact}</td>
              <td className="border-b border-gray-300 p-3">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setUpdateUserModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteUserModalOpen(true);
                  }}
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
      {/* Update User */}
      {isUpdateUserModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setUpdateUserModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Cập nhật người dùng</h3>
            </div>
            <form onSubmit={handleUpdateUser} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Tên người dùng
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
                <label htmlFor="loginName" className="block font-medium mb-1">
                  Tên đăng nhập
                </label>
                <input
                  id="loginName"
                  name="loginName"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setUpdateUserModalOpen(false)}
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
      {/* Delete User */}
      {isDeleteUserModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setDeleteUserModalOpen(false)}
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
                <strong>{selectedUser?.name}</strong> không?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setDeleteUserModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteUser}
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

export default UserMangement;
