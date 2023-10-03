import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Programmes from "@/src/Pages/Programmes";

const programmes = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className=" h-[20vh]">
        <Navbar />
      </div>
      <div className=" flex-grow">
        <Programmes />
      </div>

      <div className=" mt-auto ">
        <Footer />
      </div>
    </div>
  );
};

export default programmes;
