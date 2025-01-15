import React, { useState } from "react";
import UserProfile from "../../components/UserProfilePageComponent/UserProfile/UserProfile";
import CancelledOrder from "../../components/UserProfilePageComponent/cancelledOrder/CancelledOrder";
import ReceivedOrder from "../../components/UserProfilePageComponent/ReceivedOrder/ReceivedOrder";

const UserProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState("UserProfile");

  const renderComponent = () => {
    switch (activeComponent) {
      case "UserProfile":
        return <UserProfile />;
      case "ReceivedOrder":
        return <ReceivedOrder />;
      case "CancelledOrder":
        return <CancelledOrder />;
      default:
        return <UserProfile />;
    }
  };

  const getHeaderText = () => {
    switch (activeComponent) {
      case "UserProfile":
        return "Hồ sơ";
      case "CancelledOrder":
        return "Đơn hàng đã hủy";
      // case "ReceivedOrder":
      //   return "Đơn hàng đã đặt";
      default:
        return "Hồ sơ";
    }
  };

  return (
    <div className="mt-10">
      <div className="container px-36">
        {/* Header */}
        <div className="flex justify-between">
          <div className="inline-flex">
            trang chủ / Giỏ hàng /
            <span className="text-red-500 pl-1">{getHeaderText()}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-10 grid grid-cols-12 gap-10">
          {/* SideBar */}
          <div className="col-span-12 md:col-span-3">
            <div>
              <div className="font-medium text-lg">
                Quản lý tài khoản của tôi
              </div>
              <div className="p-3">
                <div
                  className={`mb-2 cursor-pointer ${
                    activeComponent === "UserProfile"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("UserProfile")}
                >
                  Hồ sơ
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium text-lg">Đơn hàng của tôi</div>
              <div className="p-3">
                <div
                  className={`mb-2 cursor-pointer ${
                    activeComponent === "ReceivedOrder"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("ReceivedOrder")}
                >
                  Đơn hàng đã đặt
                </div>
                {/* <div
                  className={`cursor-pointer ${
                    activeComponent === "CancelledOrder"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("CancelledOrder")}
                >
                  Đơn hàng đã hủy
                </div> */}
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="col-span-12 md:col-span-8 flex justify-center">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
