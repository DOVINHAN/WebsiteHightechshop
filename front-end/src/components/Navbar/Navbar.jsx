import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import Logo from "../../assets/logo.png";
import { getAllCategories, logout } from "../../utils/ApiFunction";

export const MenuLinks = [
  { id: 1, name: "Trang chủ", link: "/" },
  { id: 2, name: "Giới thiệu", link: "/" },
  { id: 3, name: "Về chúng tôi", link: "/AboutUs" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const user = localStorage.getItem("user");

  if (user) {
    const userForGetcartItemCount = JSON.parse(user);
    var cartItemCount = userForGetcartItemCount.cartItemCount;
    console.log(cartItemCount);
  }

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="bg-white/90 duration-200 relative z-40 shadow-md">
      <div className="bg-black py-2">
        <div className="container text-white text-sm">
          <div className="flex justify-end gap-5">
            {user ? (
              <button
                onClick={handleLogout}
                className="border-b-2 border-transparent hover:border-white"
              >
                Đăng xuất
              </button>
            ) : (
              <>
                <button className="border-b-2 border-transparent hover:border-white">
                  <Link to="/dangky">Đăng ký</Link>
                </button>
                <button className="border-b-2 border-transparent hover:border-white">
                  <Link to="/dangnhap">Đăng nhập</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="container flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-[50px] md:w-[150px]" />
            </Link>

            <div className="md:hidden flex items-center gap-4">
              <IoMdSearch className="text-black text-2xl cursor-pointer" />
              <div onClick={toggleMenu}>
                {showMenu ? (
                  <HiMenuAlt1 className="cursor-pointer" size={30} />
                ) : (
                  <HiMenuAlt3 className="cursor-pointer" size={30} />
                )}
              </div>
            </div>

            <div
              className={`hidden md:block flex-col lg:flex lg:flex-row lg:items-center gap-4 mt-4 lg:mt-0 pl-7`}
            >
              <ul className="flex flex-col lg:flex-row lg:items-center gap-1">
                {MenuLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="px-4 font-semibold text-black hover:text-black"
                    >
                      {data.name}
                    </a>
                  </li>
                ))}

                {/* Danh mục */}
                <li
                  className="relative"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  <span className="px-4 flex items-center gap-[2px] font-semibold text-black cursor-pointer">
                    Danh mục
                    <FaCaretDown className="ml-1" />
                  </span>
                  {showCategories && (
                    <div className="absolute z-10 w-[200px] rounded-md bg-white shadow-md p-2">
                      <ul className="space-y-2">
                        {categories.map((data) => (
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

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Tìm sản phẩm"
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:border-primary"
              />
              <IoMdSearch className="text-gray-500 absolute top-1/2 right-3 -translate-y-1/2" />
            </div>
            {user ? (
              <Link to="/giohang">
                <button className="relative p-3">
                  <FaCartShopping className="text-xl text-gray-600" />
                  <div className="w-4 h-4 bg-red-700 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                    {typeof cartItemCount === "number" && cartItemCount >= 0
                      ? cartItemCount
                      : 0}
                  </div>
                </button>
              </Link>
            ) : (
              <></>
            )}
            {user && (
              <Link to="/nguoidung">
                <button className="p-3">
                  <FaUser className="text-xl text-gray-600" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
