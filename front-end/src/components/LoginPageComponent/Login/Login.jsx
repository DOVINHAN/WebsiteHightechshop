import React, { useState } from "react";
import img1 from "../../../assets/register/img1.jpg";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/ApiFunction";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const user = await login(email, password);
    if (user) {
      navigate("/");
      window.location.reload();
    } else {
      setError("Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="mt-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 h-[550px]">
        {/* Image Section */}
        <div className="overflow-hidden h-[300px] md:h-[500px]">
          <img src={img1} alt="Login" className="w-full h-full object-cover" />
        </div>
        {/* Login Section */}
        <div className="flex flex-col justify-center md:px-32 mt-10 md:mt-0">
          <h2 className="text-3xl mb-2 font-medium">Đăng nhập</h2>
          <div className="text-gray-600">Nhập thông tin</div>
          {/* Input Fields */}
          <div className="space-y-8 my-7 px-4">
            <Input
              name="email"
              placeholder="Email hoặc số điện thoại"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Submit Button */}
          <Button
            bgColor={"bg-primary text-center mt-3"}
            text={"Đăng nhập"}
            textColor={"text-white"}
            className="mt-6"
            onClick={handleLogin}
          />
          <div className="text-gray-500 text-sm mt-4 inline-flex">
            Chưa có tài khoản?{" "}
            <Link to="/dangky">
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
