import img1 from "../assets/productsDummyData/img1.jpg";
import img2 from "../assets/productsDummyData/img2.jpg";
import img3 from "../assets/productsDummyData/img3.jpg";
import img4 from "../assets/productsDummyData/img4.jpg";
import img5 from "../assets/productsDummyData/img5.jpg";

const products = [
  {
    id: 1,
    name: "Laptop Gaming Pro 2024",
    newPrice: 29990000,
    oldPrice: 34990000,
    reviews: [
      { id: 1, stars: 5, comment: "Hiệu năng cực đỉnh, rất đáng tiền!" },
      { id: 2, stars: 4, comment: "Thiết kế đẹp nhưng quạt hơi ồn." },
      { id: 3, stars: 5, comment: "Chạy mượt các game AAA." },
      { id: 4, stars: 3, comment: "Màn hình không sắc nét như mong đợi." },
      { id: 5, stars: 4, comment: "Phù hợp với game thủ, giá ổn." },
    ],
    description:
      "Để có thể vừa chơi game tốt các tựa game phổ biến như Liên Minh Huyền Thoại, FIFA Online 4, DOTA 2, CS:GO và vừa học và làm việc lập trình hiệu quả thì laptop của bạn nên được trang bị các CPU Intel Core i5 hoặc AMD Ryzen 5 bạn nhé! Bạn nên lựa chọn các laptop gaming có card đồ họa rời từ NVIDIA GTX 16 Series hoặc AMD Radeon RX 5000 series trở lên để đảm bảo cho mọi trải nghiệm hình ảnh, chuyển động trong game luôn được sắc nét, chân thực nhất. 8GB RAM là mức bộ nhớ tạm tối thiểu để bạn chạy mượt mà các tác tựa game MOBA, RPG và đồng thời cũng giúp bạn xử lý mượt mà các tác vụ lập trình khác. Dẫu vậy, nếu bạn muốn thiết bị của mình mạnh mẽ và mượt mà hơn thì hãy cân nhắc các sản phẩm có dung lượng RAM 16 GB nhé!",
    images: [img1, img2], // List ảnh
    colors: ["Black", "Silver"], // List màu sắc
    sizes: ["15 inch", "17 inch"], // List kích cỡ
  },
  {
    id: 2,
    name: "Điện Thoại Thông Minh X99",
    img: img2,
    newPrice: 15990000,
    oldPrice: 18990000,
    reviews: [
      { id: 1, stars: 4, comment: "Camera đẹp nhưng pin chưa đủ trâu." },
      { id: 2, stars: 5, comment: "Hiệu năng xuất sắc, thiết kế sang trọng." },
      { id: 3, stars: 4, comment: "Giá cả hợp lý với chất lượng." },
      { id: 4, stars: 4, comment: "Mượt mà, không bị giật lag." },
    ],
    description:
      "Điện thoại thông minh với camera sắc nét, pin lâu dài và hiệu suất vượt trội.",
    images: [img2, img3],
    colors: ["Blue", "Gold", "Black"],
    sizes: ["128GB", "256GB", "512GB"],
  },
  {
    id: 3,
    name: "Tai Nghe Bluetooth X-Bass",
    newPrice: 999000,
    oldPrice: 1299000,
    reviews: [
      { id: 1, stars: 5, comment: "Âm thanh tuyệt vời, giá tốt." },
      { id: 2, stars: 4, comment: "Kết nối nhanh, pin bền." },
      { id: 3, stars: 3, comment: "Thoải mái nhưng âm bass hơi quá mạnh." },
      { id: 4, stars: 4, comment: "Thiết kế gọn nhẹ, dễ sử dụng." },
    ],
    description:
      "Tai nghe không dây âm bass mạnh mẽ, kết nối nhanh và thời lượng pin ấn tượng.",
    images: [img3, img4],
    colors: ["White", "Black", "Red"],
    sizes: ["One Size"],
  },
  {
    id: 4,
    name: "Robot Hút Bụi Thông Minh",
    newPrice: 7990000,
    oldPrice: 9990000,
    reviews: [
      { id: 1, stars: 5, comment: "Làm sạch rất tốt, không gây tiếng ồn." },
      { id: 2, stars: 4, comment: "Hút bụi hiệu quả nhưng hơi nặng." },
      { id: 3, stars: 3, comment: "Chạy không mượt khi ở thảm." },
      { id: 4, stars: 4, comment: "Pin lâu, thiết kế thông minh." },
    ],
    description:
      "Robot hút bụi tự động, tích hợp AI, làm sạch mọi ngóc ngách trong nhà bạn.",
    images: [img4, img5],
    colors: ["White", "Gray", "Black"],
    sizes: ["Standard"],
  },
  {
    id: 5,
    name: "Đồng Hồ Thông Minh FitX Pro",
    newPrice: 3990000,
    oldPrice: 4990000,
    reviews: [
      { id: 1, stars: 5, comment: "Theo dõi sức khỏe chính xác." },
      { id: 2, stars: 5, comment: "Thiết kế sang trọng, dễ dùng." },
      { id: 3, stars: 4, comment: "Pin ổn, nhiều tính năng hữu ích." },
      { id: 4, stars: 4, comment: "Màn hình sáng, rõ nét." },
      { id: 5, stars: 3, comment: "Dây đeo hơi cứng." },
    ],
    description:
      "Đồng hồ thông minh theo dõi sức khỏe, hỗ trợ tập luyện và nhận thông báo trực tiếp.",
    images: [img5, img1],
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["Small", "Medium", "Large"],
  },
];

export default products;
