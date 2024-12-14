import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Arrow } from "../assets/icons/BackArow.svg";
import FloatingIcon from "../assets/icons/Add Floating Button.svg";
import ProfileBanner from "../assets/images/Profile Banner.png";
import { useDispatch, useSelector } from "react-redux";
import { GetUserService } from "../services/userService";
import { GetPostService } from "../services/postService";

const MyAccount = () => {
  const { user } = useSelector((state) => state.users);
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetUserService());
    dispatch(GetPostService());
  }, []);

  const filterPost = allPosts?.filter(
    (myPost) => myPost?.postBy?.email === user?.email
  );

  return (
    <div className="min-h-screen justify-center bg-white">
      <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="relative h-55 bg-gradient-to-br from-orange-400 to-pink-500 rounded-b-3xl rounded-br-3xl">
          <img
            src={user?.profileBanner ? user.profileBanner : ProfileBanner}
            alt="Banner"
            className="object-cover w-full h-full opacity-70"
          />
          <Link
            to={-1}
            className="absolute inset-0 flex py-6 px-6 text-white text-xl font-bold"
          >
            <Arrow />
          </Link>
        </div>

        <div className="relative flex flex-row items-center px-2 -mt-16">
          <div className="relative w-32 h-32 mt-5">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-full h-full object-cover rounded-full  shadow-md"
            />
          </div>
          <button
            className="mt-24 text-[#000000] py-1 ml-16 mr-3 bg-white px-10 rounded-3xl border-2"
            onClick={() => navigate("/my-profile")}
          >
            Edit Profile
          </button>
        </div>
        <div className="my-2 mx-4 min-h-screen">
          <h1 className="text-[#000000] text-2xl">{user?.name}</h1>
          <p className="text-[#000000] text-sm">{user?.bio}</p>
          <h1 className="mt-3 text-[#000000] text-2xl">My Posts</h1>
          <div className="grid grid-cols-2 gap-4">
            {filterPost?.map((post, i) => (
              <div
                key={i}
                className="relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={post.imageURL}
                  alt={post.desc}
                  className="h-40 w-full object-cover"
                />

                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {i + 1}
                </div>

                <div className="p-2">
                  <h2 className="text-sm font-medium truncate">{post.title}</h2>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364l7.07 7.07a1.5 1.5 0 002.122 0l7.07-7.07a4.5 4.5 0 00-6.364-6.364l-.707.707-.707-.707a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {post.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 p-4 w-1/4 rounded-full "
        onClick={() => navigate("/add-post")}
      >
        <img
          src={FloatingIcon}
          alt="Add post"
          class="w-full m-auto justify-center"
        />
      </button>
    </div>
  );
};

export default MyAccount;
