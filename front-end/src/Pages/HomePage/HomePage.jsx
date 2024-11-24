import React from "react";
import DiscountedProducts from "../../components/HomePageComponent/DiscountedProducts/DiscountedProducts";
import BestSellingProduct from "../../components/HomePageComponent/BestSellingProduct/BestSellingProduct";
import Banner1 from "../../components/HomePageComponent/Banner1/Banner1";
import ExploreProducts from "../../components/HomePageComponent/ExploreProducts/ExploreProducts";
import Banner2 from "../../components/HomePageComponent/Banner2/Banner2";
import Services from "../../components/HomePageComponent/Services/Services";
import Hero from "../../components/homePageComponent/Hero/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <DiscountedProducts />
      <BestSellingProduct />
      <Banner1 />
      <ExploreProducts />
      <Banner2 />
      <Services />
    </div>
  );
};

export default HomePage;
