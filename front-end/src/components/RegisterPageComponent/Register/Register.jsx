import React from "react";
import img1 from "../../../assets/register/img1.jpg";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const Register = () => {
  return (
    <div className="mt-16">
      <div className="container grid grid-cols-2 h-[550px]">
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={img1}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Register Section */}
        <div className="flex flex-col justify-center px-32">
          <h2 className="text-3xl mb-2">Tạo tài khoản</h2>
          <div className="text-gray-600">Nhập thông tin</div>
          {/* Input Fields */}
          <div className="space-y-8 my-7 px-4">
            <Input placeholder="Tên" />
            <Input placeholder="Email hoặc số điện thoại" />
            <Input placeholder="Mật khẩu" type="password" />
          </div>
          {/* Submit Button */}
          <Button
            bgColor={"bg-primary text-center mt-3"}
            text={"Tạo tài khoản"}
            textColor={"text-white"}
            className="mt-6"
          />
          <div className="text-gray-500 text-sm mt-4 inline-flex">
            Đã có tài khoản?{" "}
            <p className="text-primary cursor-pointer pl-2">Đăng nhập</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
