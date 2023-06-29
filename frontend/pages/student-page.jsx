import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentPage from "../src/Pages/StudentPage";

const studentPage = () => {
  
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <StudentPage />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default studentPage;
