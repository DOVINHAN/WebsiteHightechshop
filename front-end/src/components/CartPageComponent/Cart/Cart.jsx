import React, { useEffect, useState } from "react";
import Button from "../../shared/Button";
import { getProductInCartByUserId } from "../../../utils/ApiFunction";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  const userId = jsonUser.id;

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const cartData = await getProductInCartByUserId(userId);
        const mergedProducts = cartData.productList.map((item) => {
          const productDetails = cartData.products.find(
            (product) => product.id === item.productId
          );

          return {
            ...productDetails,
            selectedSize: item.size,
            selectedColor: item.color,
            quantity: item.quantity,
          };
        });

        setCartProducts(mergedProducts);
        console.log(mergedProducts);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, [userId]);

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
                  Kích cỡ
                </th>
                <th className="border-b border-gray-300 p-3 text-left w-1/5">
                  số lượng
                </th>
                <th className="border-b border-gray-300 p-3 text-left w-1/5">
                  Giá
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product, index) => (
                <tr key={index}>
                  {/* Product */}
                  <td className="border-b border-gray-300 p-3 py-8 flex items-center gap-6">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </td>
                  {/* Size */}
                  <td className="border-b border-gray-300 p-3">
                    {product.selectedSize}
                  </td>
                  {/* quantity */}
                  <td className="border-b border-gray-300 p-3">
                    {product.quantity}
                  </td>
                  {/* Price */}
                  <td className="border-b border-gray-300 p-3">
                    {product.price.toLocaleString()} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 ">
          <Link to="/thanhtoan">
            <Button
              bgColor="bg-primary"
              text={"Đặt hàng"}
              textColor={"text-white"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
