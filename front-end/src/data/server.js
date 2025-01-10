import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Helpers to handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Increase the request body size limit
app.use(express.json({ limit: "10mb" })); // Increase the limit to 10MB
app.use(express.urlencoded({ limit: "30mb", extended: true })); // For URL-encoded data

// File path to the JSON file
const filePath = path.join(__dirname, "data.json");

// API endpoint to register user
app.post("/register", (req, res) => {
  const { name, email, phoneNumber, address, password } = req.body;
  console.log(phoneNumber);
  console.log(address);
  if (!name || !email || !phoneNumber || !address || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }
    let jsonData = JSON.parse(data);
    const newUser = {
      id: Date.now(),
      name,
      email,
      phoneNumber,
      address,
      password,
      role: "customer",
    };
    jsonData.user.push(newUser);
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing data file." });
      }
      res
        .status(201)
        .json({ message: "User registered successfully.", newUser });
    });
  });
});

// API endpoint to login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    const jsonData = JSON.parse(data);
    const user = jsonData.user.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "Mật khẩu tài khoản không hợp lệ." });
    }

    res.status(200).json({
      message: "Đăng nhập thành công!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      },
    });
  });
});

// API endpoint to fetch categories
app.get("/categories", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);
      if (!jsonData.category) {
        return res.status(404).json({ message: "Categories not found." });
      }

      res.status(200).json({ categories: jsonData.category });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

// Endpoint to get all products with a discount
app.get("/discountProductsForHomePage", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);
      if (!jsonData.product) {
        return res.status(404).json({ message: "Products not found." });
      }
      const validProducts = jsonData.product.filter(
        (product) => product.price !== null && product.price !== undefined
      );

      res.status(200).json({ data: validProducts });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

// Endpoint to get the top 4 best-selling products
app.get("/bestSellingProductsForHomePage", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);
      if (!jsonData.product) {
        return res.status(404).json({ message: "Products not found." });
      }

      const topViewedProducts = jsonData.product
        .filter(
          (product) => product.views !== null && product.views !== undefined
        )
        .sort((a, b) => b.views - a.views)
        .slice(0, 4);

      res.status(200).json({ data: topViewedProducts });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

// Endpoint to get 8 random products
app.get("/exploreProductsForHomePage", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);
      if (!jsonData.product) {
        return res.status(404).json({ message: "Products not found." });
      }

      const validProducts = jsonData.product.filter(
        (product) => product.price !== null && product.price !== undefined
      );

      // Shuffle and take 8 random products
      const shuffledProducts = validProducts.sort(() => 0.5 - Math.random());
      const randomProducts = shuffledProducts.slice(0, 8);

      res.status(200).json({ data: randomProducts });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

// Endpoint API lấy danh sách người dùng với phân trang
app.get("/getAllUsers", (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const currentPage = parseInt(page);
  const size = parseInt(pageSize);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);

      if (!jsonData.user) {
        return res.status(404).json({ message: "Users not found." });
      }

      const users = jsonData.user;

      const startIndex = (currentPage - 1) * size;
      const endIndex = startIndex + size;
      const paginatedUsers = users.slice(startIndex, endIndex);

      const totalUsers = users.length;

      res.status(200).json({
        users: paginatedUsers,
        totalUsers,
        currentPage,
        totalPages: Math.ceil(totalUsers / size),
      });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

// API để cập nhật người dùng
app.post("/updateUser", (req, res) => {
  const { id, name, email, phoneNumber, address, role } = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);
      const userIndex = jsonData.user.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ message: "User not found." });
      }
      jsonData.user[userIndex] = {
        id,
        name,
        email,
        phoneNumber,
        address,
        role,
      };
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error updating user." });
        }

        res.status(200).json({ message: "User updated successfully." });
      });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

app.delete("/deleteUser/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("Deleting user with ID:", userId);

  // Chuyển userId thành số (int) trước khi so sánh
  const numericUserId = parseInt(userId, 10);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);

      if (!jsonData.user) {
        return res.status(404).json({ message: "Users not found." });
      }

      let users = jsonData.user;

      // Tìm người dùng theo id
      const userIndex = users.findIndex((user) => user.id === numericUserId);
      if (userIndex !== -1) {
        // Xóa người dùng khỏi danh sách
        users.splice(userIndex, 1);

        // Lưu lại dữ liệu vào file
        fs.writeFile(filePath, JSON.stringify({ user: users }), (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error saving updated data." });
          }

          res.status(200).json({ message: "User deleted successfully!" });
        });
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

app.get("/getAllProducts", (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const currentPage = parseInt(page);
  const size = parseInt(pageSize);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }

    try {
      const jsonData = JSON.parse(data);

      if (!jsonData.product) {
        return res.status(404).json({ message: "Products not found." });
      }

      const products = jsonData.product;

      const startIndex = (currentPage - 1) * size;
      const endIndex = startIndex + size;
      const paginatedProducts = products.slice(startIndex, endIndex);

      const totalProducts = products.length;

      res.status(200).json({
        products: paginatedProducts,
        totalProducts,
        currentPage,
        totalPages: Math.ceil(totalProducts / size),
      });
    } catch (error) {
      return res.status(500).json({ message: "Error parsing JSON data." });
    }
  });
});

app.post("/addProduct", (req, res) => {
  const { name, description, price, discountPrice, images, colors, sizes } =
    req.body;
  if (
    !name ||
    !description ||
    !price ||
    !colors.length ||
    !sizes.length ||
    !images.length
  ) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file." });
    }
    let jsonData = JSON.parse(data);
    const newProduct = {
      id: Date.now(),
      name,
      description,
      price,
      discountPrice,
      images,
      colors,
      sizes,
    };
    jsonData.product.push(newProduct);
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing data file." });
      }
      res
        .status(201)
        .json({ message: "Product added successfully.", newProduct });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
