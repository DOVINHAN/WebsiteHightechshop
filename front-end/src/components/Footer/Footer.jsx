import React from "react";
import footerLogo from "../../assets/logo-removebg.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const CustomerSupport = [
  {
    title: "Hướng dẫn thanh toán",
    link: "/#",
  },
  {
    title: "Chính sách bảo hành",
    link: "/#",
  },
  {
    title: "Thông tin liên hệ",
    link: "/#",
  },
  {
    title: "Điều khoản sử dụng",
    link: "/#",
  },
];

const Information = [
  {
    title: "Tin tức",
    link: "/#",
  },
  {
    title: "Giới thiệu",
    link: "/#",
  },
  {
    title: "Phương thức thanh toán",
    link: "/#",
  },
  {
    title: "Tuyển dụng",
    link: "/#",
  },
];

const Footer = () => {
  return (
    <div className="text-white bg-black mt-40">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
  <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex flex-col items-center">
    <img src={footerLogo} alt="" className="max-w-[200px]" />
    HighTech Shop
  </h1>
  <p className="mt-10 text-center">
    UY TÍN TẠO NÊN THƯƠNG HIỆU
  </p>
</div>


          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Hỗ trợ khách hàng
                </h1>
                <ul className="flex flex-col gap-3">
                  {CustomerSupport.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Tài khoản
                </h1>
                <ul className="flex flex-col gap-3">
                  {Information.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* social links */}
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Liên kết khác
              </h1>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>688/91 Quang Trung</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+0359256696</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
