import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination.js";
import { paginate } from "../../../utils/paginate.js";
import HeaderSection from "../../ui-components/HeaderSection";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";

import CHILDABI from "../../../utils/childABI.json";

import { TbExchange } from "react-icons/tb";
import TableRow from "../../ui-components/TableRow";
import { toast } from "react-toastify";

const Mentors = () => {
  const [query, setQuery] = useState("");
  const [mentorsList, setMentorsList] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolName, setSchoolName] = useState();
  const [programName, setProgramName] = useState();
  const [mentorOnDuty, setMentorOnDuty] = useState();
  const [mentorOnDutyName, setMentorOnDutyName] = useState();
  const [programAddress, setProgramAddress] = useState();

  /// FETCH THE LIST OF ALL STAFFS
  const { data: mentorsListData, isLoading: mentorsListIsLLoading } =
    useContractRead({
      address: programAddress,
      abi: CHILDABI,
      functionName: "listMentors",
      onSuccess(data) {
        console.log(data);
      },
    });

  useContractRead({
    address: programAddress,
    abi: CHILDABI,
    watch: true,
    functionName: "getMentorOnDuty",
    onSuccess(data) {
      setMentorOnDuty(data);
    },
  });

  useContractRead({
    address: programAddress,
    abi: CHILDABI,
    functionName: "getMentorsName",
    watch: true,
    args: [mentorOnDuty],
    onSuccess(data) {
      setMentorOnDutyName(data);
    },
  });

  const { config: handOverConfig } = usePrepareContractWrite({
    address: programAddress,
    abi: CHILDABI,
    functionName: "mentorHandover",
    args: [selectedMentor],
  });

  const {
    data: handOverData,
    isError: handOverIsError,
    error: handOverError,
    write: handOverWrite,
  } = useContractWrite(handOverConfig);

  useWaitForTransaction({
    hash: handOverData?.hash,

    onSuccess(data) {
      toast.success(`Hand over successful`);
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let res = localStorage.getItem("programAddress");
      setProgramAddress(res);
    }

    // if (handOverIsError) {
    //   toast.error(`Error encountered: ${handOverError}`)
    // }

    setMentorsList(mentorsListData);
  }, [mentorsList, mentorsListData, mentorOnDutyName]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleDelete = (post) => {
  //   setPosts(posts.filter((p) => p.id !== post.id));
  // };

  const handleCheckboxChange = (event, mentor) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedMentor(mentor);
    }
    // else {
    //   setSelectedMentor(selectedMentor.filter((s) => s !== mentor));
    // }
  };

  const handleHandOver = () => {
    // const remainingMentors = mentorsList.filter(
    //   (mentor) => !selectedMentors.some((s) => s === mentor)
    // );
    handOverWrite?.();
    setMentorsList(mentorsListData);
    setSelectedMentor("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { search } = e.target;
    const searchValue = search.value;

    setQuery(searchValue);

    e.target.reset();
  };

  const paginateMentors = paginate(mentorsList, currentPage, pageSize);

  return (
    <div>
      <HeaderSection
        heading={"Mentors List"}
        subHeading={"Welcome to Classmate+ Mentors List"}
      />
      <div className="relative scrollbar-hide overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-4">
          <TbExchange
            fontSize={20}
            color="#1E429F"
            onClick={handleHandOver}
            disabled={selectedMentor === ""}
          />
          <div>
            <p>
              Mentor on duty:{" "}
              {mentorOnDuty == "" ? "No Mentor on Duty" : mentorOnDutyName}
            </p>
          </div>
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
                Hand over
              </th>
            </tr>
          </thead>
          <tbody>
            {paginateMentors &&
              paginateMentors
                ?.filter((mentor) => {
                  return query.toLowerCase() === ""
                    ? mentor
                    : mentor.toLowerCase().includes(query);
                })
                ?.map((mentor, ind) => (
                  <TableRow
                    key={ind}
                    address={mentor}
                    ind={ind}
                    selectedAddresses={selectedMentor}
                    setSelectedAddresses={setSelectedMentor}
                    mentor={true}
                  />
                ))}
          </tbody>
        </table>
        <Pagination
          items={mentorsList?.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Mentors;
