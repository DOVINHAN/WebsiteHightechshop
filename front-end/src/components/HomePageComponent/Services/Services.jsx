import React from "react";
import { FaCarSide } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaShield } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="mt-16 md:mt-40 container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Giao hàng miễn phí */}
        <div className="text-center">
          <div className="bg-gray-400 inline-flex items-center justify-center p-3 rounded-full mb-8">
            <div className="bg-black p-4 rounded-full">
              <FaCarSide className="text-white text-3xl" />
            </div>
          </div>
          <div className="font-bold text-lg">
            GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG
          </div>
          <div className="text-gray-500">
            Giao hàng miễn phí cho tất cả các đơn hàng trên 500.000vnđ
          </div>
        </div>

        {/* Dịch vụ khách hàng */}
        <div className="text-center">
          <div className="bg-gray-400 inline-flex items-center justify-center p-3 rounded-full mb-8">
            <div className="bg-black p-4 rounded-full">
              <TfiHeadphoneAlt className="text-white text-3xl" />
            </div>
          </div>
          <div className="font-bold text-lg">DỊCH VỤ KHÁCH HÀNG 24/7</div>
          <div className="text-gray-500">Hỗ trợ khách hàng thân thiện 24/7</div>
        </div>

        {/* Đảm bảo hoàn tiền */}
        <div className="text-center">
          <div className="bg-gray-400 inline-flex items-center justify-center p-3 rounded-full mb-8">
            <div className="bg-black p-4 rounded-full">
              <FaShield className="text-white text-3xl" />
            </div>
          </div>
          <div className="font-bold text-lg">ĐẢM BẢO HOÀN TIỀN</div>
          <div className="text-gray-500">
            Chúng tôi đảm bảo hoàn lại tiền trong vòng 30 ngày
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
