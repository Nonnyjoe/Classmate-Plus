import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Programmes from "@/src/Pages/Programmes";

const programmes = () => {
  return (
    <div className="w-full flex flex-col">
      <div>
        <Navbar />
      </div>
      <div>
        <Programmes />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default programmes;
