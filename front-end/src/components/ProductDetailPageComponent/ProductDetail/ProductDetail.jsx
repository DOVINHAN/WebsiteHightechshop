import React, { useEffect, useState } from "react";
import Button from "../../shared/Button";
import { FaCarSide } from "react-icons/fa6";
import { GiRecycle } from "react-icons/gi";
import Relatedproducts from "../Relatedproducts/Relatedproducts";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../utils/ApiFunction";

const ProductDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(numericId);
        setProduct(response);
        setTimeout(() => {
          setProduct(response);
          if (response?.images) {
            setSelectedImage(response.images[0]);
          }
        }, 500);
      } catch (err) {
        console.error("API Error:", err);
        alert("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      }
    };

    fetchProduct();
  }, [numericId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20">
      <div className="container lg:px-36">
        {/* Header */}
        <div className="flex justify-between mb-5">
          <div className="inline-flex text-gray-500">
            trang chủ / sản phẩm / {product.name}
          </div>
        </div>
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-10">
          {/* Product Images */}
          <div className="flex gap-2">
            {/* Image List */}
            <div className="flex flex-col gap-4 w-1/4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-full cursor-pointer border ${
                    selectedImage === img ? "border-primary" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            {/* Big Image */}
            <div className="w-3/4">
              <div className="h-[250px] w-[250px] md:h-[450px] md:w-[450px] rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Name */}
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold text-primary">
                {product.discountPrice.toLocaleString("vi-VN")}₫
              </div>
              <div className="text-gray-500 line-through">
                {product.price.toLocaleString("vi-VN")}₫
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Colors */}
            <div className="mb-4 flex">
              <div className="mb-2">Màu sắc:</div>
              <div className="flex gap-2 pl-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full cursor-pointer border-2 border-black"
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4 flex items-center">
              <div className="font-bold mb-2">Kích cỡ:</div>
              <div className="flex gap-2 pl-4">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`w-13 h-10 flex items-center justify-center cursor-pointer rounded border transition-colors p-2 ${
                      selectedSize === size
                        ? "bg-primary text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Buy Button */}
            <div className="flex items-center gap-12 mb-6 mt-10">
              {/* Quantity */}
              <div className="flex items-center gap-2 border border-gray-400">
                <button
                  className="w-9 h-9 border rounded hover:bg-primary hover:text-white"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="w-9 h-9 border rounded hover:bg-primary hover:text-white"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                bgColor="bg-primary"
                text={"Thêm vào giỏ hàng"}
                textColor={"text-white"}
              />
            </div>

            {/* Services */}
            <div className="border border-black w-2/3 mt-10">
              <div className="grid grid-rows-2 divide-y divide-black">
                {/* Row 1 */}
                <div className="flex items-center gap-2 px-4 py-3">
                  <FaCarSide className="text-primary text-2xl" />
                  <div>
                    <div className="font-bold">Giao hàng miễn phí</div>
                    <div className="text-gray-500">
                      Nhập mã bưu chính của bạn để biết tình trạng sẵn sàng giao
                      hàng
                    </div>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="flex items-center gap-2 px-4 py-3">
                  <GiRecycle className="text-primary text-2xl" />
                  <div>
                    <div className="font-bold">Trả lại hàng</div>
                    <div className="text-gray-500">
                      Trả lại hàng miễn phí trong 30 ngày. Chi tiết
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Relatedproducts />
      </div>
    </div>
  );
};

export default ProductDetail;
