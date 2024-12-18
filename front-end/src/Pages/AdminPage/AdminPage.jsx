import React, { useState } from "react";
import CategoriesManagement from "../../components/AdminPageComponent/CategoriesManagement/CategoriesManagement";
import ProductMangementPage from "../ProductMangementPage/ProductMangementPage";
import UserMangement from "../../components/AdminPageComponent/UserManagement/UserManagement";
import ProductsManagement from "../../components/AdminPageComponent/ProductsManagement/ProductsManagement";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("UserMangement");
  const renderComponent = () => {
    switch (activeComponent) {
      case "CategoriesManagement":
        return <CategoriesManagement />;
      case "ProductMangementPage":
        return <ProductsManagement />;
      case "UserMangement":
        return <UserMangement />;
      default:
        return <UserMangement />;
    }
  };

  const getHeaderText = () => {
    switch (activeComponent) {
      case "UserMangement":
        return "Quản lý người dùng";
      case "CategoriesManagement":
        return "Quản lý danh mục";
      case "ProductMangementPage":
        return "Quản lý sản phẩm";
      default:
        return "Quản lý người dùng";
    }
  };

  return (
    <div className="mt-10">
      <div className="container px-36">
        {/* Header */}
        <div className="flex justify-between">
          <div className="inline-flex">
            Admin /<span className="text-red-500 pl-1">{getHeaderText()}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-10 grid grid-cols-12 gap-10">
          {/* SideBar */}
          <div className="col-span-12 md:col-span-3">
            <div>
              <div className="font-medium text-lg">Quản lý người dùng</div>
              <div className="p-3">
                <div
                  className={`mb-2 cursor-pointer ${
                    activeComponent === "UserMangement"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("UserMangement")}
                >
                  Người dùng
                </div>
              </div>
            </div>
            <div>
              <div className="font-medium text-lg">Quản lý website</div>
              <div className="p-3">
                <div
                  className={`mb-2 cursor-pointer ${
                    activeComponent === "ProductMangementPage"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("ProductMangementPage")}
                >
                  Quản lý sản phẩm
                </div>
                <div
                  className={`cursor-pointer ${
                    activeComponent === "CategoriesManagement"
                      ? "text-red-500 font-bold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveComponent("CategoriesManagement")}
                >
                  Quản lý danh mục
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 flex justify-center">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
