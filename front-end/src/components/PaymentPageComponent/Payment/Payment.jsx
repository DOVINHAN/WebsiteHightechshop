import React, { useEffect, useState } from "react";
import Button from "../../shared/Button";
import {
  addorderdetail,
  getProductInCartByUserId,
} from "../../../utils/ApiFunction";

const Payment = () => {
  const user = localStorage.getItem("user");
  const jsonUser = JSON.parse(user);
  const userId = jsonUser.id;

  const [cartProducts, setCartProducts] = useState([]);

  const handlePayment = async () => {
    const fullName = document.getElementById("full_name").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phone_number").value;
    const email = document.getElementById("email").value;

    if (!fullName || !address || !phoneNumber || !email) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const orderData = {
      userId,
      fullName,
      address,
      phoneNumber,
      email,
      products: cartProducts.map((product) => ({
        productId: product.id,
        name: product.name,
        size: product.selectedSize,
        color: product.selectedColor,
        quantity: product.quantity,
        price: product.price,
        discountPrice: product.discountPrice,
      })),
    };

    try {
      const response = await addorderdetail(orderData);
      if (response.status === 201) {
        alert("Đặt hàng thành công!");
      } else {
        alert("Đã xảy ra lỗi khi đặt hàng.");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  };

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
          <div className="inline-flex">trang chủ / Giỏ hàng / thanh toán</div>
        </div>

        {/* Payment Section */}
        <div className="mt-16 text-3xl">Chi tiết thanh toán</div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* User Information */}
          <div className="">
            <div className="text-lg font-semibold mb-4">
              Thông tin người dùng
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tỉnh - Huyện / Quận - Xã, Tên đường
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-4">
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
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-4">
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
                  placeholder=""
                  required
                />
              </div>

              {/* Save Information Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="save_info"
                  className="accent-primary w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="save_info"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Lưu thông tin này để lần đặt hàng sau nhanh hơn
                </label>
              </div>
            </form>
          </div>

          {/* Bill List */}
          <div className="px-14">
            <div className="text-lg font-semibold mb-4">Danh sách hóa đơn</div>
            {/* Product List */}
            <div className="space-y-0">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border-b border-gray-300 py-3"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </div>
                  <div className="text-right">
                    {product.price.toLocaleString()} đ
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="mt-4">
              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <div>Tổng:</div>
                <div>
                  {cartProducts
                    .reduce(
                      (acc, product) =>
                        acc +
                        (product.discountPrice !== null
                          ? product.discountPrice
                          : product.price),
                      0
                    )
                    .toLocaleString()}{" "}
                  đ
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-300 py-3">
                <div>Phí ship:</div>
                <div>Miễn phí</div>
              </div>

              <div className="flex justify-between items-center py-3">
                <div>Tổng thanh toán:</div>
                <div>
                  {cartProducts
                    .reduce(
                      (acc, product) =>
                        acc +
                        (product.discountPrice !== null
                          ? product.discountPrice
                          : product.price),
                      0
                    )
                    .toLocaleString()}{" "}
                  đ
                </div>
              </div>
            </div>
            {/* payment selection */}
            {/* <div className="flex flex-col mt-3">
              <div className="flex items-center ">
                <input
                  type="radio"
                  id="payment_qr"
                  name="payment_method"
                  value="qr"
                  className="accent-primary w-4 h-4 text-primary border-gray-300 rounded-full focus:ring-primary"
                />
                <label
                  htmlFor="payment_qr"
                  className="ml-2 text-xl font-semibold text-gray-900"
                >
                  Thanh toán bằng QR
                </label>
              </div>

              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  id="payment_cash"
                  name="payment_method"
                  value="cash"
                  className="accent-primary w-4 h-4 text-primary border-gray-300 rounded-full focus:ring-primary"
                />
                <label
                  htmlFor="payment_cash"
                  className="ml-2 text-xl font-semibold text-gray-900"
                >
                  Thanh toán bằng tiền mặt
                </label>
              </div>
            </div> */}

            {/* Payment Option */}
            <div className="mt-8 ">
              <Button
                bgColor="bg-primary"
                text={"Đặt hàng"}
                textColor={"text-white"}
                onClick={handlePayment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
