import React from "react";
import Button from "../../shared/Button";
import products from "../../../data/productsDummnyData";

const Cart = () => {
  return (
    <div className="mt-20">
      <div className="container px-36">
        {/* Header */}
        <div className="flex justify-between">
          <div className="inline-flex">
            trang chủ / <p className="ml-1">Giỏ hàng</p>
          </div>
        </div>

        {/* Delete All Button */}
        <div className="mt-6 flex justify-end">
          <Button
            bgColor={"bg-white border-black border-solid border"}
            text={"Xóa tất cả"}
            textColor={"text-black"}
          />
        </div>

        {/* Products Table */}
        <div className="mt-10">
          <table className="table-auto w-full border-collapse border-spacing-y-4 border-spacing-x-2">
            <thead>
              <tr>
                <th className="border-b border-gray-300 p-3 text-left w-2/5">
                  Sản phẩm
                </th>
                <th className="border-b border-gray-300 p-3 text-left w-1/5">
                  Giá
                </th>
                <th className="border-b border-gray-300 p-3 text-left w-1/5">
                  Số lượng
                </th>
                <th className="border-b border-gray-300 p-3 text-left w-1/5">
                  Tổng
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  {/* product */}
                  <td className="border-b border-gray-300 p-3 py-8 flex items-center gap-6">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </td>
                  {/* price */}
                  <td className="border-b border-gray-300 p-3">
                    {product.newPrice.toLocaleString()} đ
                  </td>
                  {/* number */}
                  <td className="border-b border-gray-300 p-3">
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="w-16 border border-gray-300 text-center rounded"
                    />
                  </td>
                  {/* price */}
                  <td className="border-b border-gray-300 p-3">
                    {product.newPrice.toLocaleString()} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bill */}
        <div className="w-10/12 flex justify-end">
          <div className="mt-20 w-full max-w-lg border border-black p-4">
            {/* header */}
            <div className="text-xl font-semibold mb-4">
              Tổng tiền trong giỏ hàng
            </div>

            {/* Bill List */}
            <div className="space-y-4">
              {/* Tổng */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div>Tổng:</div>
                <div>
                  {products
                    .reduce((acc, product) => acc + product.newPrice, 0)
                    .toLocaleString()}{" "}
                  đ
                </div>
              </div>

              {/* Phí ship */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <div>Phí ship:</div>
                <div>Miễn phí</div>
              </div>

              {/* Tổng thanh toán */}
              <div className="flex justify-between items-center">
                <div>Tổng thanh toán:</div>
                <div>
                  {products
                    .reduce((acc, product) => acc + product.newPrice, 0)
                    .toLocaleString()}{" "}
                  đ
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8 flex justify-center">
              <Button
                bgColor="bg-primary"
                text={"Tiến hành thanh toán"}
                textColor={"text-white"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
