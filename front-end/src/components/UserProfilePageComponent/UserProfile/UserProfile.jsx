import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Thông tin người dùng
      </div>
      <form>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Tên người dùng"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Địa chỉ"
              value={user.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Số điện thoại
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Số điện thoại"
              value={user.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Thay đổi mật khẩu
          </label>
          <input
            type="password"
            id="password"
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
          <input
            type="password"
            id="passwordAgain"
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Nhập mật khẩu mới"
            required
          />
          <input
            type="password"
            id="passwordAgain2"
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Nhập mật khẩu mới lần nữa"
            required
          />
        </div>
      </form>
      <div className="flex justify-end mt-10">
        <div>
          <Button
            bgColor="bg-white"
            text={"Về trang chủ"}
            textColor={"text-black"}
          />
        </div>
        <div className="ml-4">
          <Button bgColor="bg-primary" text={"Lưu"} textColor={"text-white"} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
