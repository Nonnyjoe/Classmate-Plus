const TableRow = ({
    index,
    address,
}) => {
  return (
    <section >
      <tr
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            key={address}
        >
            <td className="px-6 py-4"> {index} </td>
            <td className="px-6 py-4"> {"User name"} </td>
            <td className="px-6 py-4"> {address} </td>
            <td className="px-6 py-4"> Button
            {/* <button                    >
                {" "}
                <div className="flex items-center">
                <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    checked={selectedMentors.some(
                    (s) => s === mentor
                    )}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => handleCheckboxChange(e, mentor)}
                />
                </div>{" "}
            </button> */}
            </td>
        </tr>
    </section>
  );
};

export default TableRow;
