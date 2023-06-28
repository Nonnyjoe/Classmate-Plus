import React, { useEffect, useState } from "react";

import RoleCard from "../src/ui-components/RoleCard";

const Events = () => {
  const [visible, setVisible] = useState(6);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <h2 className="mb-4 text-2xl font-semibold text-blue-950">Roles</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ml-12">
        <RoleCard />
      </div>
      <div className=" flex flex-row items-center justify-center pt-4 mt-4	">
        <button
          className=" bg-[#080E26] rounded-full p-4 text-dimWhite w-36 font-semibold"
          onClick={showMoreItems}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Events;
