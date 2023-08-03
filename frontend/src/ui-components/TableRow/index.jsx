import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import ChildAbi from "../../../utils/childABI.json";

const TableRow = ({
  address,
  ind,
  selectedAddresses,
  setSelectedAddresses,
  mentor,
}) => {
  const [userName, setUserName] = useState("");
  const [funcName, setFuncName] = useState("");
  const [programAddress, setProgramAddress] = useState();

  // Fetches the name of the address passed
  const { data: userNameData } = useContractRead({
    address: programAddress,
    abi: ChildAbi,
    functionName: funcName,
    args: [address ?? "0x00"],
  });

  const handleCheckboxChange = (event, address) => {
    const { checked } = event.target;

    if (mentor) {
      if (checked) {
        setSelectedAddresses(address);
      }
      // else {
      //   setSelectedAddresses(selectedAddresses.filter((s) => s !== address));
      // }
    } else {
      if (checked) {
        setSelectedAddresses([...selectedAddresses, address]);
      } else {
        setSelectedAddresses(selectedAddresses.filter((s) => s !== address));
      }
    }
  };

  useEffect(
    () => {
      if (typeof window !== "undefined") {
        let res = localStorage.getItem("programAddress");
        setProgramAddress(res);
      }

      setUserName(userNameData);
      mentor ? setFuncName("getMentorsName") : setFuncName("getStudentName");
    },
    [userNameData, programAddress],
    mentor
  );

  return (
    <tr
      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
      key={address}
    >
      <td className="px-6 py-4"> {ind + 1} </td>
      <td className="px-6 py-4"> {userName} </td>
      <td className="px-6 py-4"> {address} </td>
      <td className="px-6 py-4">
        <button
        //onClick={() => handleDelete(post)}
        //className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {" "}
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={
                mentor
                  ? selectedAddresses === address
                  : selectedAddresses.some((s) => s === address)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleCheckboxChange(e, address)}
            />
          </div>{" "}
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
