import React from "react";

const CategoriesManagement = () => {
  // Dummy data cho danh mục
  const categories = [
    "Iphone",
    "Ipad",
    "Samsung",
    "Oppo",
    "Xiaomi",
    "Gaming phone",
    "Phụ kiện",
    "Đồng hồ",
    "PC",
  ];

  // Xử lý các hành động
  const handleEdit = (category) => {
    alert(`Chỉnh sửa danh mục: ${category}`);
  };

  const handleDelete = (category) => {
    alert(`Xóa danh mục: ${category}`);
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý danh mục
      </div>

      <div className="">
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
          Thêm danh mục
        </button>
      </div>

      <table className="table-auto w-full border-collapse border-spacing-y-4 border-spacing-x-2 mt-6">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-3 text-left w-3/4">
              Tên danh mục
            </th>
            <th className="border-b border-gray-300 p-3 text-left w-1/4">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td className="border-b border-gray-300 p-3">{category}</td>
              <td className="border-b border-gray-300 p-3">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesManagement;
