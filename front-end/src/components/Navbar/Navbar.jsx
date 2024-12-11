import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import Logo from "../../assets/logo.png";
import ResponsiveMenu from "./ResponsiveMenu";

export const MenuLinks = [
  { id: 1, name: "Trang chủ", link: "/" },
  { id: 2, name: "Giới thiệu", link: "/" },
  { id: 3, name: "Về chúng tôi", link: "/AboutUs" },
];

export const DropdownLinks1 = [
  { id: 1, name: "Iphone", link: "/#" },
  { id: 2, name: "Ipad", link: "/#" },
  { id: 3, name: "Samsung", link: "/#" },
  { id: 4, name: "Oppo", link: "/#" },
  { id: 5, name: "Xiaomi", link: "/#" },
  { id: 6, name: "Gaming phone", link: "/#" },
  { id: 7, name: "Phụ kiện", link: "/#" },
  { id: 8, name: "Đồng hồ", link: "/#" },
  { id: 9, name: "PC", link: "/#" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [dropdown1Open, setDropdown1Open] = useState(false);

  const toggleDropdown1 = () => {
    setDropdown1Open(!dropdown1Open);
  };

  return (
    <div className="bg-white/90 duration-200 relative z-40 shadow-md">
      {/* login and register button */}
      <div className="bg-black py-2">
        <div className="container text-white text-sm">
          <div className="flex justify-end gap-5">
            <button className="border-b-2 border-transparent hover:border-white">
              <Link to="/dangky" className="">
                Đăng ký
              </Link>
            </button>
            <button className="border-b-2 border-transparent hover:border-white">
              <Link to="/dangnhap" className="">
                Đăng nhập
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="container flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Link to="/" className="">
              <img src={Logo} alt="Logo" className="w-[50px] md:w-[150px]" />
            </Link>
            {/* Responsive navbar */}
            <div className="md:hidden flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative group w-10 h-10">
                <input
                  type="text"
                  placeholder=""
                  className="absolute top-0 left-0 w-full h-full opacity-0 focus:opacity-100 transition-all duration-300 rounded-full border border-gray-300 focus:border-primary focus:outline-none p-2"
                />
                <IoMdSearch className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl cursor-pointer" />
              </div>

              {/* Mobile Hamburger menu */}
              <div className="">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div
              className={` hidden md:block
              } flex-col lg:flex lg:flex-row lg:items-center w-full lg:w-auto lg:gap-4 mt-4 lg:mt-0 pl-7`}
            >
              <ul className="flex flex-col lg:flex-row lg:items-center gap-1 w-full lg:w-auto">
                {MenuLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-black hover:text-black  duration-200"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}

                {/* Dropdown1 */}
                <li className="relative">
                  <a
                    onClick={toggleDropdown1}
                    className="px-4 flex items-center gap-[2px] font-semibold text-black  cursor-pointer sm:py-2"
                  >
                    Sản phẩm
                    <FaCaretDown
                      className={`ml-1 transition-transform duration-300 ${
                        dropdown1Open ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                  {dropdown1Open && (
                    <div className="absolute z-10 w-[200px] rounded-md bg-white shadow-md  p-2 ">
                      <ul className="space-y-2">
                        {DropdownLinks1.map((data) => (
                          <li key={data.id}>
                            <a
                              className="text-black duration-200 inline-block w-full p-2 hover:bg-primary/90 rounded-md font-semibold"
                              href={data.link}
                            >
                              {data.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Search Bar and cart*/}
          <div className="hidden lg:flex items-center gap-4 mt-4 lg:mt-0">
            {/* Search Bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Tìm sản phẩm"
                className=" w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary "
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
            {/* Cart */}
            <Link to="/giohang" className="">
              <button className="relative p-3">
                <FaCartShopping className="text-xl text-gray-600 " />
                <div className="w-4 h-4 bg-red-700 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  0
                </div>
              </button>
            </Link>
            {/* user */}
            <Link to="/nguoidung" className="">
              <button className="relative p-3">
                <FaUser className="text-xl text-gray-600 " />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} togglemenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
