import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Programmes from "@/src/Pages/Programmes";

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
