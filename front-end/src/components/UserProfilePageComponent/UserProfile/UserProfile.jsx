import React from "react";
import Button from "../../shared/Button";
import products from "../../../data/productsDummnyData";

const UserProfile = () => {
  return (
    <div className="mt-20">
      <div className="container px-36">
        {/* Header */}
        <div className="flex justify-between">
          <div className="inline-flex">trang chủ / Giỏ hàng / thanh toán</div>
        </div>

        {/* Payment Section */}
        <div className="mt-16 grid grid-cols-12 gap-10">
          {/* SideBar */}
          <div className="col-span-12 md:col-span-3">
            <div>
              <div className="font-medium text-lg">
                Quản lý tài khoản của tôi
              </div>
              <div className="p-3">
                <div className="text-primary mb-2">Hồ sơ</div>
                <div className="text-gray-500">Tùy chọn thanh toán của tôi</div>
              </div>
            </div>
            <div>
              <div className="font-medium text-lg">Đơn hàng của tôi</div>
              <div className="p-3">
                <div className="mb-2 text-gray-500">Đơn hàng đã đặt</div>
                <div className="text-gray-500">Đơn hàng đã hủy</div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="col-span-12 md:col-span-8 flex justify-center ">
            <div className="w-full max-w-3xl ">
              <div className="text-lg font-semibold mb-4 text-primary">
                Thông tin người dùng
              </div>
              <form className="">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label
                      htmlFor="full_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Tên người dùng"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="688/91 đường Quang Trung, quận Gò Vấp"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <label
                      htmlFor="phone_number"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="0359256696"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="nguyenhuutrong11133@gmail.com"
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
                    id="password"
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                  <input
                    type="password"
                    id="password"
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
                  <Button
                    bgColor="bg-primary"
                    text={"Lưu"}
                    textColor={"text-white"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
