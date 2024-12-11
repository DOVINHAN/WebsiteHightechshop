import React from "react";
import img1 from "../../../assets/register/img1.jpg";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 h-[550px]">
        {/* Image Section */}
        <div className="overflow-hidden h-[300px] md:h-[500px]">
          <img
            src={img1}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Register Section */}
        <div className="flex flex-col justify-center md:px-32 mt-10 md:mt-0">
          <h2 className="text-3xl mb-2 font-medium">Đăng nhập</h2>
          <div className="text-gray-600">Nhập thông tin</div>
          {/* Input Fields */}
          <div className="space-y-8 my-7 px-4">
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
            <Link to="/dangky" className="">
              <p className="text-primary cursor-pointer pl-2">Đăng ký</p>
            </Link>
          </div>
          <div className="text-gray-500 text-sm">Quên mật khẩu</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
