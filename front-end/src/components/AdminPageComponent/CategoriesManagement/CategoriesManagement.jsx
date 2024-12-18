import React from "react";

const CategoriesManagement = () => {
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

  const [isAddCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState(false);
  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý danh mục
      </div>

      <div className="">
        <button
          onClick={() => setAddCategoryModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
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
      {/* add category modal*/}
      {isAddCategoryModalOpen && (
        <div
          id="addCategory-modal"
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setAddCategoryModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow  w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Thêm danh mục
              </h3>
              <button
                onClick={() => setAddCategoryModalOpen(false)}
                className="text-gray-400 hover:bg-gray-200 rounded-lg p-1"
              >
                <span>&times;</span>
              </button>
            </div>
            {/* Form Content */}
            <form className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên danh mục
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* update category modal */}
    </div>
  );
};

export default CategoriesManagement;
