import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "./utils/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import CartPage from "./Pages/CartPage/CartPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ProductMangementPage from "./Pages/ProductMangementPage/ProductMangementPage";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dangnhap" element={<LoginPage />} />
          <Route path="/dangky" element={<RegisterPage />} />
          <Route path="/sanpham" element={<ProductsPage />} />
          <Route
            path="/sanpham/chitietsanpham"
            element={<ProductDetailPage />}
          />
          <Route path="/vechungtoi" element={<AboutPage />} />
          <Route
            path="/trangsanpham/chitietsanpham"
            element={<ProductDetailPage />}
          />
          <Route path="/giohang" element={<CartPage />} />
          <Route path="/thanhtoan" element={<PaymentPage />} />
          <Route path="/quanlysanpham" element={<ProductMangementPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
