import React from "react";
import Programmes from "../src/Pages/Programmes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programmes = () => {
  return (
    <div>
      <div className="w-screen">
        <Navbar />
      </div>

      <Programmes />
      <div className=" w-screen">
        <Footer />
      </div>
    </div>
  );
};

export default programmes;
