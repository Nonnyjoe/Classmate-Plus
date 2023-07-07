import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../../utils/paginate";
import HeaderSection from "../../ui-components/HeaderSection";
import { MdDelete } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../atoms/addressAtom";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import ChildAbi from "../../../utils/childABI.json";

const Students = () => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [programAddress, setProgramAddress] = useState("") ;
  
  const PROGRAM_ADDR = useRecoilValue(addressState);

  const { data: listStudentsData, isLoading: listStudentIsLoading } = useContractRead({
    address: programAddress ?? '0x00',
    abi: ChildAbi,
    functionName: "liststudents",
  })

  const { config: deleteStudentsConfig } = usePrepareContractWrite({
    address: programAddress ?? '0x00',
    abi: ChildAbi,
    functionName: "EvictStudents",
    args: [selectedStudents]
  })


  const {data: deleteStudentsData, isLoading: deleteStudentsIsLoading, write: deleteStudentsWrite} = useContractWrite(deleteStudentsConfig)




  // Fetches the name of the address passed
  // const get_name = (addr) => {
  //   const { data } = useContractRead({
  //     address: programAddress,
  //     abi: ChildAbi,
  //     functionName: "getStudentName",
  //     args: [addr ?? '0x00']
  //   })

  //   const contract = 
  //   return data
  // }


  useEffect(() => {

    setProgramAddress(PROGRAM_ADDR ?? '0x00')
    setStudents(listStudentsData);
    console.log(students);

  }, [students, listStudentsData, programAddress]);
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleDelete = (post) => {
  //   setPosts(posts.filter((p) => p.id !== post.id));
  // };

  const handleCheckboxChange = (event, student) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      setSelectedStudents(selectedStudents.filter((s) => s !== student));
    }
  };

  const handleDeleteSelected = () => {
    // const remainingStudents = students.filter(
    //   (student) => !selectedStudents.some((s) => s === student)
    // );
    // setStudents(remainingStudents);
    deleteStudentsWrite?.();
    setStudents(listStudentsData);
    setSelectedStudents([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { search } = e.target;
    const searchValue = search.value;

    setQuery(searchValue);

    e.target.reset();
  };

  const paginateStudents = paginate(students, currentPage, pageSize);

  return (
    <div>
      <HeaderSection
        heading={"Students List"}
        subHeading={"Welcome to Classmate+ Students List"}
      />
      <div className="relative scrollbar-hide overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-4">
          <MdDelete
            fontSize={20}
            color="#1E429F"
            onClick={handleDeleteSelected}
            disabled={selectedStudents?.length === 0}
          />
          <form onSubmit={handleSubmit}>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-2xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {paginateStudents && (paginateStudents
              .filter((student) => {
                return query.toLowerCase() === ""
                  ? student
                  : student.toLowerCase().includes(query);
              })
              .map((student, ind) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={student}
                >
                  <td className="px-6 py-4"> {ind + 1} </td>
                  <td className="px-6 py-4"> {"User name"} </td>
                  <td className="px-6 py-4"> {student} </td>
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
                          checked={selectedStudents.some(
                            (s) => s === student
                          )}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleCheckboxChange(e, student)}
                        />
                      </div>{" "}
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
        <Pagination
          items={students?.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Students;
