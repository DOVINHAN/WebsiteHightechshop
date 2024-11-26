import React from "react";
import Heading from "../../shared/Heading";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../../../assets/banner2/img1.png";
import img2 from "../../../assets/banner2/img2.png";
import img3 from "../../../assets/banner2/img3.png";
import img4 from "../../../assets/banner2/img4.png";

const Banner2 = () => {
  return (
    <div className="mt-20">
      <div className="container">
        <Heading title={"SẢN PHẨM MỚI"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
          {/* column1 */}
          <div className="flex h-[350px] md:h-full bg-black p-4 md:p-8 rounded-lg shadow-md">
            {/* content */}
            <div className="w-1/2 md:w-2/5  flex flex-col justify-center p-8">
              <h1
                data-aos="fade-down"
                data-aos-delay="200"
                className="text-white font-bold text-xl md:text-3xl"
              >
                IPHONE 16 PROMAX
              </h1>
              <h2
                data-aos="fade-right"
                data-aos-delay="250"
                className="text-sm md:text-md text-white my-5"
              >
                Phiên bản xanh của IPHONE16 PROMAX sắp được bán.
              </h2>
              <button
                data-aos="fade-up"
                data-aos-delay="300"
                className="self-start text-white inline-flex items-center text-sm md:text-md"
                style={{
                  textDecoration: "underline",
                  textDecorationThickness: "1px",
                  textUnderlineOffset: "5px",
                }}
              >
                Mua ngay <FaArrowRightLong className="ml-2" />
              </button>
            </div>
            {/* img */}
            <div className="w-1/2 md:w-3/5">
              <img
                data-aos="fade-left"
                data-aos-delay="100"
                src={img1}
                className=" h-full max-[450px] object-cover"
              />
            </div>
          </div>

          {/* column2 */}
          <div className="grid grid-rows-2 gap-3 md:gap-5">
            {/* half column2 */}
            <div className="flex h-[350px] md:h-full bg-black p-4 md:p-8 rounded-lg shadow-md">
              {/* content */}
              <div className="w-1/2 flex flex-col justify-center p-8">
                <h1
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="text-white font-bold  text-xl md:text-3xl"
                >
                  Đồng hồ thông minh
                </h1>
                <h2
                  data-aos="fade-left"
                  data-aos-delay="250"
                  className="text-sm md:text-md text-white my-5"
                >
                  Các bộ sưu tập dành cho phụ nữ nổi bật mang đến cho bạn cảm
                  giác khác.
                </h2>
                <button
                  data-aos="fade-down"
                  data-aos-delay="300"
                  className="self-start text-white inline-flex items-center text-sm md:text-md"
                  style={{
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "5px",
                  }}
                >
                  Mua ngay <FaArrowRightLong className="ml-2" />
                </button>
              </div>
              {/* img */}
              <div className="w-1/2 flex items-center justify-center">
                <img
                  data-aos="fade-right"
                  data-aos-delay="100"
                  src={img2}
                  className="object-cover"
                />
              </div>
            </div>

            {/* half column2 */}
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {/* column1 */}
              <div className="bg-black h-[300px] md:h-full p-8 rounded-lg shadow-md relative">
                {/* content */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-center z-10">
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-white font-bold text-xl md:text-3xl"
                  >
                    Tai nghe bluetooth
                  </h1>
                  <h2
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="text-sm md:text-md text-white my-5"
                  >
                    Mẫu tai nghe mới nhất.
                  </h2>
                  <button
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="self-center text-white inline-flex items-center "
                    style={{
                      textDecoration: "underline",
                      textDecorationThickness: "1px",
                      textUnderlineOffset: "5px",
                    }}
                  >
                    Mua ngay <FaArrowRightLong className="ml-2" />
                  </button>
                </div>

                {/* img */}
                <div className="w-full flex justify-center mt-8">
                  <img
                    data-aos="fade-down"
                    data-aos-delay="100"
                    src={img3}
                    className="object-cover max-w-[150px] max-h-[150px] md:max-w-[300px] md:max-h-[300px]"
                  />
                </div>
              </div>

              {/* column2 */}
              <div className="bg-black h-[300px] md:h-full p-8 rounded-lg shadow-md relative">
                {/* content */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-center z-10">
                  <h1
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="text-white font-bold text-xl md:text-3xl"
                  >
                    IPAD mới nhất
                  </h1>
                  <h2
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="text-sm md:text-md text-white my-5"
                  >
                    Mẫu ipad mới nhất.
                  </h2>
                  <button
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="self-center text-white inline-flex items-center text-sm md:text-md"
                    style={{
                      textDecoration: "underline",
                      textDecorationThickness: "1px",
                      textUnderlineOffset: "5px",
                    }}
                  >
                    Mua ngay <FaArrowRightLong className="ml-2" />
                  </button>
                </div>

                {/* img */}
                <div className="w-full flex justify-center mt-8">
                  <img
                    data-aos="fade-down"
                    data-aos-delay="100"
                    src={img4}
                    className="object-cover max-w-[150px] max-h-[150px] md:max-w-[300px] md:max-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
