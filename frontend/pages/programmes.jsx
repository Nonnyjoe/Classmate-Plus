import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Programmes from "@/src/Pages/Programmes";

const programmes = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-[10%]">
        <Navbar />
      </div>
      <div className=" h-[80%]">
        <Programmes />
      </div>

      <div className=" h-[10%]">
        <Footer />
      </div>
    </div>
  );
};

export default programmes;
