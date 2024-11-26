import React from "react";
import img from "../../../assets/banner1/img1.png";
import Button from "../../shared/Button";

const Banner1 = () => {
  return (
    <div className="mt-20 container overflow-hidden">
      <div className="bg-black h-[450px] rounded-md grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Content Section */}
        <div className="flex flex-col justify-center pl-10">
          <div
            data-aos="fade-down"
            data-aos-delay="200"
            className="text-secondary text-2xl"
          >
            Danh mục
          </div>
          <h2
            data-aos="fade-right"
            data-aos-delay="250"
            className="text-2xl sm:text-2xl md:text-5xl font-bold text-white my-5 md:my-10"
          >
            Nâng tầm cuộc chơi với gaming thế hệ mới
          </h2>
          <div data-aos="fade-up" data-aos-delay="300">
            <Button
              bgColor="bg-secondary"
              text={"Xem tất cả sản phẩm"}
              textColor={"text-white"}
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            data-aos="fade-left"
            data-aos-delay="200"
            src={img}
            alt="Banner"
            className="h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner1;
