import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { paginate } from "../../../utils/paginate";
import { TiDocumentDelete } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import HeaderSection from "../../ui-components/HeaderSection";
import Section from "../../ui-components/Section";

const Students = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(res);
    };
    getPosts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <div>
      <HeaderSection
        heading={"Mentors List"}
        subHeading={"Welcome to Classmate+ Mentors List"}
      />
      <div className="relative scrollbar-hide overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end items-center">
          <input
            type="text"
            placeholder="Search..."
            className=" border-none outline-none rounded-3xl m-4 bg-[#fafafa] p-3"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatePosts
              .filter((post) => {
                return query.toLowerCase() === ""
                  ? post
                  : post.title.toLowerCase().includes(query);
              })
              .map((post) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={post.id}
                >
                  <td className="px-6 py-4"> {post.id} </td>
                  <td className="px-6 py-4"> {post.title} </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(post)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {" "}
                      <TiDocumentDelete />{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          items={posts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Students;
