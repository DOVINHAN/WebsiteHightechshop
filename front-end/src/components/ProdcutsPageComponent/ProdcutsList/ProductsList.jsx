import Heading from "../../shared/Heading";
import Dropdown from "../../shared/Dropdown";
import Pagination from "../../shared/Pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "./path/to/apiFunction";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(1, 10); // Giả sử bạn muốn lấy page 1, pageSize 10
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error fetching products.");
      }
    };

    fetchProducts();
  }, []);

  const generateProductUrl = (product) => {
    const removeVietnameseTones = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    };

    const productNameInUrl = removeVietnameseTones(product.name)
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return `/sanpham/chitietsanpham/${productNameInUrl}/${product.id}`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-0 md:gap-10 md:items-center">
          <Heading title={"APPLE"} />
          <div className="flex gap-4 mt-0 md:mt-5 mb-8 md:mb-0">
            {/* Dropdown options */}
            <Dropdown
              id="brand"
              label="Hãng"
              options={["Apple", "Samsung", "Oppo", "Realme"]}
            />
            <Dropdown
              id="price"
              label="Giá"
              options={["Dưới 10 triệu", "10-20 triệu", "Trên 20 triệu"]}
            />
            <Dropdown
              id="os"
              label="Hệ điều hành"
              options={["iOS", "Android"]}
            />
          </div>
        </div>
        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.slice(0, 16).map((product, index) => (
            <Link to={generateProductUrl(product)} key={product.id}>
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 200}`}
                className="rounded-md bg-white hover:bg-black/80 hover:text-white shadow-xl duration-high group max-w-[275px] h-[350px] md:h-[400px] mb-10 md:mb-0 overflow-hidden flex flex-col"
              >
                {/* Image Section */}
                <div className="h-[270px] w-full overflow-hidden flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 duration-300 drop-shadow-md"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between p-4 h-full">
                  <div className="text-center">
                    <h1 className="line-clamp-2 text-xl font-bold">
                      {product.name}
                    </h1>
                    <div className="w-full flex items-center justify-center gap-1 flex-col md:flex-row">
                      <span className="text-red-500 font-bold text-md md:text-lg">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.newPrice)}
                      </span>
                      <span className="line-through text-gray-400 text-sm ml-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.oldPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Description and Button */}
                  <div className="mt-auto text-center">
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 md:line-clamp-4">
                      {product.description}
                    </p>
                    <button className="bg-primary hover:bg-white text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* view all products button */}
        <div className="mt-10 flex justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

