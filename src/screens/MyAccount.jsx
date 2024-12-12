import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Arrow } from "../assets/icons/BackArow.svg";
import FloatingIcon from "../assets/icons/Add Floating Button.svg";
import ProfileBanner from "../assets/images/Profile Banner.png";
import ProfileIcon from "../assets/images/ProfileIcon.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetUserService } from "../services/userService";

const posts = [
  {
    id: 1,
    image: ProfileBanner,
    title: "Design meet",
    likes: 67,
    badge: "1/2",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    title: "Working on a B2B...",
    likes: 40,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    title: "Parachute ❤️",
    likes: 65,
  },
  {
    id: 4,
    image: ProfileBanner,
    title: "Design meet",
    likes: 67,
    badge: "1/2",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200",
    title: "Working on a B2B...",
    likes: 40,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200",
    title: "Parachute ❤️",
    likes: 65,
  },
];

const MyAccount = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetUserService());
  }, []);

  console.log(user);

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
            className="mt-24 text-[#000000] py-1 ml-auto mr-2 bg-white px-12 rounded-3xl shadow-sm border border-[#00000057]"
            onClick={() => navigate("/my-profile")}
          >
            Edit Profile
          </button>
        </div>
        <div className="py-2 px-4">
          <h1 className="text-[#000000] text-2xl">{user.name}</h1>
          <p className="text-[#000000] text-sm">
            Just someone who loves designing, sketching, and finding beauty in
            the little things 💕
          </p>
          <h1 className="mt-3 text-[#000000] text-2xl">My Posts</h1>
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-40 w-full object-cover"
                />
                {/* Badge */}
                {post.badge && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {post.badge}
                  </div>
                )}
                {/* Content */}
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
        onClick={() => ""}
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
