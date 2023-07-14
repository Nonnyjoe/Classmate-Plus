import { useContractRead } from "wagmi";
import styles from "./TableRow.module.css";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import ChildAbi from "../../../utils/childABI.json";

const TableRow = ({
  address,
  ind,
  selectedAddresses,
  setSelectedAddresses,
  mentor
}) => {

  const [userName, setUserName] = useState("");
  const [programAddr, setProgramAddr] = useState("");
  const [funcName, setFuncName] = useState("");
  const programAddress = useRecoilValue(addressState);


  // Fetches the name of the address passed
  const { data: userNameData } = useContractRead({
    address: programAddr,
    abi: ChildAbi,
    functionName: funcName,
    args: [address ?? '0x00']
  })

  const handleCheckboxChange = (event, address) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedAddresses([...selectedAddresses, address]);
    } else {
      setSelectedAddresses(selectedAddresses.filter((s) => s !== address));
    }
  };

  useEffect(() => {
    setUserName(userNameData);
    setProgramAddr(programAddress);
    mentor ? setFuncName("getMentorsName") : setFuncName("getStudentName") ;
  }, [userNameData])


  return (

    <tr  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
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
              checked={selectedAddresses.some(
                (s) => s === address
              )}
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
