import React from "react";
import Heading from "../../shared/Heading";
import Button from "../../shared/Button";
import products from "../../../data/productsDummnyData";

const Relatedproducts = () => {
  return (
    <div className="mt-20">
      <div className="container">
        <Heading title={"SẢN PHẨM LIÊN QUAN"} />
        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <div className="w-full">
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`}
                className="rounded-md bg-white hover:bg-black/80 hover:text-white shadow-xl duration-high group max-w-[275px] h-[350px] md:h-[400px] mb-10 md:mb-0 overflow-hidden flex flex-col mx-auto"
              >
                {/* Image Section */}
                <div className="h-[270px] w-full overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 duration-300 drop-shadow-md"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between p-4 h-full">
                  <div className="text-center">
                    <h1 className="line-clamp-2 text-xl font-bold">
                      {product.name}
                    </h1>
                    <div className="w-full flex items-center justify-center flex-col md:flex-row">
                      <span className="text-red-500 font-bold text-md md:text-lg">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.newPrice)}
                      </span>
                      <span className="line-through text-gray-400 text-sm ml-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.oldPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Description and Button */}
                  <div className="mt-auto text-center">
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 md:line-clamp-4">
                      {product.description}
                    </p>
                    <button className="bg-primary hover:bg-white text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* view all products button */}
        {/* <div className="mt-10 flex justify-center">
          <Button
            bgColor="bg-primary"
            text={"Xem tất cả sản phẩm"}
            textColor={"text-white"}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Relatedproducts;
