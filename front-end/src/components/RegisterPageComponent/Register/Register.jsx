import React, { useState } from "react";
import img1 from "../../../assets/register/img1.jpg";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { Link } from "react-router-dom";
import { register } from "../../../utils/ApiFunction";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const { name, email, password } = formData;
    console.log(name);
    console.log(email);
    console.log(password);
    if (!name || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const result = await register(name, email, password);
    if (result) {
      alert("Đăng ký thành công!");
    } else {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="mt-16 pb-20 md:pb-0">
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
        <form className="flex flex-col justify-center md:px-32 mt-10 md:mt-0">
          <h2 className="text-3xl mb-2 font-medium">Tạo tài khoản</h2>
          <div className="text-gray-600">Nhập thông tin</div>
          {/* Input Fields */}
          <div className="space-y-8 my-7 px-4">
            <Input
              placeholder="Tên"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Email hoặc số điện thoại"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Mật khẩu"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* Submit Button */}
          <Button
            bgColor={"bg-primary text-center mt-3"}
            text={"Tạo tài khoản"}
            textColor={"text-white"}
            className="mt-6"
            onClick={handleRegister}
          />
          <div className="text-gray-500 text-sm mt-4 inline-flex">
            Đã có tài khoản?{" "}
            <Link to="/dangnhap" className="">
              <p className="text-primary cursor-pointer pl-2">Đăng nhập</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
