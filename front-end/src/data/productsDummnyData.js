import img1 from "../assets/productsDummyData/img1.jpg";
import img2 from "../assets/productsDummyData/img2.jpg";
import img3 from "../assets/productsDummyData/img3.jpg";
import img4 from "../assets/productsDummyData/img4.jpg";
import img5 from "../assets/productsDummyData/img5.jpg";

const products = [
  {
    id: 1,
    name: "Laptop Gaming Pro 2024",
    img: img1,
    newPrice: 29990000,
    oldPrice: 34990000,
    reviews: [5, 4, 5, 3, 4],
    description:
      "Laptop gaming hiệu suất cao, thiết kế mạnh mẽ, phù hợp cho game thủ chuyên nghiệp.",
  },
  {
    id: 2,
    name: "Điện Thoại Thông Minh X99",
    img: img2,
    newPrice: 15990000,
    oldPrice: 18990000,
    reviews: [4, 5, 4, 4],
    description:
      "Điện thoại thông minh với camera sắc nét, pin lâu dài và hiệu suất vượt trội.",
  },
  {
    id: 3,
    name: "Tai Nghe Bluetooth X-Bass",
    img: img3,
    newPrice: 999000,
    oldPrice: 1299000,
    reviews: [5, 4, 3, 4],
    description:
      "Tai nghe không dây âm bass mạnh mẽ, kết nối nhanh và thời lượng pin ấn tượng.",
  },
  {
    id: 4,
    name: "Robot Hút Bụi Thông Minh",
    img: img4,
    newPrice: 7990000,
    oldPrice: 9990000,
    reviews: [5, 4, 3, 4],
    description:
      "Robot hút bụi tự động, tích hợp AI, làm sạch mọi ngóc ngách trong nhà bạn.",
  },
  {
    id: 5,
    name: "Đồng Hồ Thông Minh FitX Pro",
    img: img5,
    newPrice: 3990000,
    oldPrice: 4990000,
    reviews: [5, 5, 4, 4, 3],
    description:
      "Đồng hồ thông minh theo dõi sức khỏe, hỗ trợ tập luyện và nhận thông báo trực tiếp.",
  },
];

export default products;
