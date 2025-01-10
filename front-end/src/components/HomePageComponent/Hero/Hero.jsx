import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../../../assets/hero/img1.png";
import img2 from "../../../assets/hero/img2.png";
import img3 from "../../../assets/hero/img3.png";
import img4 from "../../../assets/hero/img4.png";
import img5 from "../../../assets/hero/img5.png";
import { getAllCategories } from "../../../utils/ApiFunction";

const carouselData = [
  {
    id: 1,
    branch: "Apple",
    content:
      "Khám phá sản phẩm mới nhất với thiết kế độc đáo và ưu đãi đặc biệt!",
    img: img1,
  },
  {
    id: 2,
    branch: "Apple",
    content: "Giảm giá 50% cho bộ sưu tập mùa đông!",
    img: img2,
  },
  {
    id: 3,
    branch: "Apple",
    content: "Mua sắm tuần này để nhận voucher giảm giá 20%!",
    img: img3,
  },
  {
    id: 4,
    branch: "Apple",
    content:
      "Đăng ký thành viên hôm nay để nhận ngay mã giảm 10% và giao hàng miễn phí!",
    img: img4,
  },
  {
    id: 5,
    branch: "Apple",
    content: "Siêu sale mua 1 tặng 1 cho sản phẩm hot nhất!",
    img: img5,
  },
];

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="pt-10">
      <div className="container grid grid-cols-12 gap-6">
        {/* category list */}
        <div className="hidden col-span-12 md:block md:col-span-3">
          <ul className="space-y-2">
            {categories.map((data, index) => (
              <li
                key={data.id}
                data-aos="fade-right"
                data-aos-delay={`${index * 100}`}
              >
                <a
                  className="text-black text-sm duration-200 inline-block w-full p-2 hover:bg-primary/90 rounded-md font-semibold"
                  href={data.link}
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* hero slide */}
        <div className="col-span-12 md:col-span-9">
          <div className="relative w-full bg-black " id="custom-carousel">
            {/* Wrapper for the slides */}
            <div className="overflow-hidden relative h-96">
              {carouselData.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex h-full transition-transform duration-700 ease-in-out ${
                    currentIndex === index ? "block" : "hidden"
                  }`}
                >
                  {/* Content Section */}
                  <div className="w-1/2 md:w-3/5  flex flex-col justify-center p-8">
                    <h1
                      data-aos="fade-down"
                      data-aos-delay="200"
                      className="text-white text-xl"
                    >
                      {item.branch}
                    </h1>
                    <h2
                      data-aos="fade-right"
                      data-aos-delay="250"
                      className="text-xl md:text-3xl font-bold text-white my-5"
                    >
                      {item.content}
                    </h2>
                    <button
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="self-start text-white inline-flex items-center"
                      style={{
                        textDecoration: "underline",
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "5px",
                      }}
                    >
                      Mua ngay <FaArrowRightLong className="ml-2" />
                    </button>
                  </div>

                  {/* Image Section */}
                  <div className="w-1/2 md:w-2/5 flex items-center">
                    <img
                      data-aos="fade-left"
                      data-aos-delay="100"
                      src={item.img}
                      alt={`Slide ${index + 1}`}
                      className="w-auto h-[300px] md:h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Carousel Indicators */}
            <div className="absolute z-30 flex bottom-5 left-1/2 transform -translate-x-1/2 space-x-3">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
