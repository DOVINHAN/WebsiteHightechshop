import React from "react";
import { FaUserCircle } from "react-icons/fa";

import { MenuLinks, DropdownLinks1 } from "./Navbar";

const ResponsiveMenu = ({ showMenu }) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-10 text-black transition-all duration-200 md:hidden  shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Bạn chưa đăng nhập</h1>
            <h1 className="text-sm text-slate-500">Đăng nhập ngay?</h1>
          </div>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2 text-lg">
            {MenuLinks.map((data) => (
              <li>
                <a href={data.link} className="mb-3 inline-block">
                  {data.name}
                </a>
              </li>
            ))}
            <div>
              <div>Sản phẩm</div>
              <div className="pl-2">
                {DropdownLinks1.map((data) => (
                  <li>
                    <a href={data.link} className="mb-3 inline-block text-sm">
                      {data.name}
                    </a>
                  </li>
                ))}
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1></h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
