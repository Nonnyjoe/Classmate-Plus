import React from "react";
import Programmes from "../src/Pages/Programmes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programmes = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <Programmes />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default programmes;
