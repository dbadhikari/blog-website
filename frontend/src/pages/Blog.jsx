import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { Field, Form, Formik } from "formik";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [allLiked, setAllLiked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const currentUserId = localStorage.getItem("id");
  const userToken = localStorage.getItem("token");
  const nav = useNavigate();

  // Fetch blogs with pagination and search
  const getData = async () => {
    try {
      const req = await axios.get("http://localhost:2000/api/blog/find", {
        params: {
          page,
          limit: 3,
          search: searchTerm, // send search term
        },
      });

      setBlogs(req.data.data); // replace old blogs
      setTotalPage(req.data.totalPages);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Fetch likes
  const getLike = async () => {
    try {
      const req = await axios.get("http://localhost:2000/api/like/findall");
      setAllLiked(req.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // Fetch data whenever page or searchTerm changes
  useEffect(() => {
    const delay = setTimeout(() => {
      getData();
      getLike();
    }, 500); // debounce search

    return () => clearTimeout(delay);
  }, [page, searchTerm]);

  return (
    <div className="h-screen w-full">
      {/* Header */}
      <div className="w-full flex flex-col items-center">
        <h4 className="text-sm text-gray-500 my-2">OUR BLOGS</h4>
        <h1 className="text-4xl my-2">Find Our All Blogs From Here</h1>
        <p className="max-w-3xl text-center text-md text-gray-600 my-2">
          Our blogs are written by experienced writers so you can enjoy the best articles.
        </p>
      </div>

      {/* Search */}
      <div className="w-full flex justify-center mt-5">
        <Formik initialValues={{ search: "" }}>
          {({ setFieldValue }) => (
            <Form className="flex items-center gap-2 relative h-10 w-1/3">
              <Field
                name="search"
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setFieldValue("search", e.target.value);
                  setSearchTerm(e.target.value);
                  setPage(1); // reset page to 1 on new search
                }}
                className="outline h-full w-full rounded-2xl pl-5"
              />
              <button className="absolute right-2 h-10 w-10 flex justify-center items-center">
                <FaSearch size={25} />
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Blog cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-5 pt-15 p-20 overflow-y-auto">
        {blogs.length > 0 ? (
          blogs.map((elem, idx) => {
            const findLiked = allLiked.filter((item) => item.postid === elem._id);
            const isLikedByUser = allLiked.find(
              (item) => item.userid === currentUserId && item.postid === elem._id
            );

            return (
              <div key={idx}>
                <div className="h-[360px]">
                  <img
                    className="h-full w-full object-cover rounded-3xl"
                    src={elem.image}
                    alt="img"
                  />
                </div>
                <div className="pt-5">
                  <h1 className="capitalize">
                    {elem.category}
                    <span className="bold text-gray-400 text-sm pl-5">
                      {elem.createdAt ? elem.createdAt.split("T")[0] : null}
                    </span>
                  </h1>
                  <h1 className="font-bold py-5">{elem.title}</h1>
                  <p className="font-light text-md text-gray-600">
                    {elem.content.split(" ").slice(0, 25).join(" ")} ....
                  </p>

                  {/* Read More + Likes */}
                  <div className="flex items-center justify-between mt-5">
                    <button
                      onClick={() => nav(`/read/${elem._id}`)}
                      className="cursor-pointer text-md font-bold text-[#7c4ee4] underline rounded active:scale-95"
                    >
                      Read More...
                    </button>

                    <div className="flex items-center gap-2 pr-10">
                      <button
                        className="cursor-pointer"
                        onClick={async () => {
                          if (!userToken) {
                            alert("Please login to like");
                            nav("/login");
                            return;
                          }
                          if (isLikedByUser) {
                            await axios.delete(
                              `http://localhost:2000/api/like/delet/${isLikedByUser._id}`
                            );
                          } else {
                            await axios.post("http://localhost:2000/api/like/create", {
                              postid: elem._id,
                              userid: currentUserId,
                            });
                          }
                          getLike();
                        }}
                      >
                        {isLikedByUser ? (
                          <AiFillLike size={35} color="#3a98f6" />
                        ) : (
                          <AiOutlineLike size={35} />
                        )}
                      </button>
                      <h1 className="text-2xl">{findLiked.length}</h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-gray-500 text-2xl mt-10 relative left-80">
            No blogs available
          </h1>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center gap-5 mb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {page} / {totalPage}
        </span>
        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blog;