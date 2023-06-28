import React from "react";
import Link from "next/link";

const RoleCard = () => {
  return (
    <Link href="/dashboard">
      <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-5/6 h-full flex flex-col items-center justify-center">
        <div className="relative rounded-lg ">
          <img
            src="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=620&quality=85&dpr=1&s=none"
            width={500}
            height={500}
            className="rounded-lg h-[300px] w-[300px] object-cover"
          />
        </div>
        <div className="w-full h-full text-blue-950 text-lg font-semibold pl-3">
          <h2 className="relative my-2 text-lg">Role</h2>
          <p className=" text-sm">Programme</p>
          <p className="font-semibold text-[#080E26] text-sm">School</p>
        </div>
      </div>
    </Link>
  );
};

export default RoleCard;
