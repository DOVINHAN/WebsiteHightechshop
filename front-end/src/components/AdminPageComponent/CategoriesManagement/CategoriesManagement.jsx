import React, { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategory,
} from "../../../utils/ApiFunction";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState(false);
  const [isDeleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newCategoryName = e.target.name.value.trim();
    if (newCategoryName) {
      const newCategory = { name: newCategoryName };

      try {
        const response = await addCategory(newCategory);
        if (response?.newCategory) {
          setCategories([...categories, response.newCategory]);
          alert("Thêm danh mục thành công!"); // Alert thông báo thành công
        }
        setAddCategoryModalOpen(false);
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Thêm danh mục thất bại!"); // Alert thông báo thất bại
      }
    } else {
      alert("Vui lòng nhập tên danh mục!"); // Alert khi không nhập tên
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const updatedName = e.target.name.value.trim();

    if (updatedName && selectedCategory) {
      const updatedCategory = {
        ...selectedCategory,
        name: updatedName,
      };

      try {
        const response = await updateCategory(updatedCategory);
        if (response) {
          setCategories(
            categories.map((cat) =>
              cat.id === updatedCategory.id ? updatedCategory : cat
            )
          );
          setUpdateCategoryModalOpen(false);
          alert("Cập nhật danh mục thành công!");
        } else {
          throw new Error(response.data.message || "Update failed.");
        }
      } catch (error) {
        console.error("Error updating category:", error.message || error);
        alert("Cập nhật danh mục thất bại. Vui lòng thử lại.");
      }
    } else {
      alert("Vui lòng nhập tên danh mục!");
    }
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        const response = await deleteCategoryById(selectedCategory.id);

        if (response.status === 200) {
          setCategories(
            categories.filter((cat) => cat.id !== selectedCategory.id)
          );
          setDeleteCategoryModalOpen(false);
          alert("Xóa danh mục thành công!");
        } else {
          throw new Error(response.data.message || "Delete failed.");
        }
      } catch (error) {
        console.error("Error deleting category:", error.message || error);
        alert("Xóa danh mục thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-lg font-semibold mb-4 text-primary">
        Quản lý danh mục
      </div>

      <button
        onClick={() => setAddCategoryModalOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
      >
        Thêm danh mục
      </button>

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
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border-b border-gray-300 p-3">{category.name}</td>
              <td className="border-b border-gray-300 p-3">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setUpdateCategoryModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setDeleteCategoryModalOpen(true);
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

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setAddCategoryModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Thêm danh mục</h3>
            </div>
            <form onSubmit={handleAddCategory} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Tên danh mục
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  required
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

      {/* Update Category Modal */}
      {isUpdateCategoryModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setUpdateCategoryModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Cập nhật danh mục</h3>
            </div>
            <form onSubmit={handleUpdateCategory} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1">
                  Tên danh mục
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue={selectedCategory?.name}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setUpdateCategoryModalOpen(false)}
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

      {/* Delete Category Modal */}
      {isDeleteCategoryModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={() => setDeleteCategoryModalOpen(false)}
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
                <strong>{selectedCategory?.name}</strong> không?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setDeleteCategoryModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDeleteCategory}
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

export default CategoriesManagement;
