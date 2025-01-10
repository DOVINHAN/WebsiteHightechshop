import React, { useEffect, useState } from "react";
import Pagination from "../../shared/Pagination";
import {
  deleteUserById,
  getAllUser,
  updateUser,
} from "../../../utils/ApiFunction";

const UserMangement = () => {
  // Các state để lưu trữ dữ liệu người dùng và phân trang
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Các modal và state liên quan
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Gọi API để lấy người dùng khi thay đổi trang hoặc pageSize
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUser(currentPage, pageSize);
      setUsers(data.users); // Cập nhật danh sách người dùng
      setTotalUsers(data.totalUsers); // Cập nhật tổng số người dùng
    };

    fetchUsers();
  }, [currentPage, pageSize]); // Gọi lại khi currentPage hoặc pageSize thay đổi

  // Hàm để xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm xử lý các hành động như chỉnh sửa và xóa người dùng
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedUser = {
      ...selectedUser,
      name: formData.get("name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
      role: formData.get("role"),
    };

    try {
      const response = await updateUser(updatedUser);

      if (response.status === 200) {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setUpdateUserModalOpen(false);
        alert("Cập nhật người dùng thành công!");
      } else {
        throw new Error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error updating user:", error.message || error);
      alert("Cập nhật người dùng thất bại. Vui lòng thử lại.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUserById(selectedUser.id);

      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        setDeleteUserModalOpen(false);
        alert("Xóa người dùng thành công!");
      } else {
        throw new Error(response.data.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message || error);
      alert("Xóa người dùng thất bại. Vui lòng thử lại.");
    }
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
            <th className="border-b border-gray-300 p-3 text-left w-1/12">
              ID
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-3/12">
              Tên người dùng
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-2/12">
              Email
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-2/12">
              Số điện thoại
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-4/12">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-gray-300 p-3">{user.id}</td>
              <td className="border-b border-gray-300 p-3">{user.name}</td>
              <td className="border-b border-gray-300 p-3">{user.email}</td>
              <td className="border-b border-gray-300 p-3">
                {user.phoneNumber}
              </td>
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
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalUsers / pageSize)}
          onPageChange={handlePageChange}
        />
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
                  defaultValue={selectedUser?.name}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue={selectedUser?.email}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block font-medium mb-1">
                  Số điện thoại
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue={selectedUser?.phoneNumber}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Địa chỉ
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue={selectedUser?.address}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block font-medium mb-1">
                  Vai trò
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue={selectedUser?.role}
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
              <h3 className="text-lg font-semibold">Xóa người dùng</h3>
            </div>
            <div className="p-4">
              <p>
                Bạn có chắc chắn muốn xóa người dùng{" "}
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
