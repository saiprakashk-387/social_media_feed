import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Arrow } from "../assets/icons/BackArow.svg";
import ProfileBanner from "../assets/images/Profile Banner.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserService, updateProfile } from "../services/userService";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const fileBannerRef = useRef(null);

  const [profileData, setProfileData] = useState({
    bio: "",
    name: "",
    photoURL: "",
    profileBanner: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(GetUserService());
  }, []);

  useEffect(() => {
    if (user) {
      setProfileData({
        bio: user.bio || "",
        name: user.name || "",
        profileBanner: user?.profileBanner || ProfileBanner,
        photoURL: user?.photoURL || "",
      });
    }
  }, [user]);

  const onSubmit = () => {
    setLoading(true);
    dispatch(updateProfile(profileData))
      .then((res) => setLoading(false))
      .catch((err) => console.log("error in updating profile"));
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the hidden input click
  };
  const handleFileChange = (e) => {
    let files = e.target.files;
    Object.values(files).map((val, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onload = () => {
        const imageslist = reader.result;
        setProfileData({
          ...profileData,
          photoURL: imageslist,
        });
      };
    });
  };

  const handleBannerClick = () => {
    fileBannerRef.current.click(); // Trigger the hidden input click
  };
  const handleBannerChange = (e) => {
    let files = e.target.files;
    Object.values(files).map((val, i) => {
      const reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onload = () => {
        const imageslist = reader.result;
        setProfileData({
          ...profileData,
          profileBanner: imageslist,
        });
      };
    });
  };

  return (
    <div className="min-h-screen flex justify-start bg-white">
      <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="relative h-55 bg-gradient-to-br from-orange-400 to-pink-500 rounded-b-3xl rounded-br-3xl">
          <img
            src={profileData?.profileBanner}
            alt="Banner"
            className="object-cover w-full h-full opacity-70"
          />
          <Link
            to={-1}
            className="absolute inset-0 flex py-6 px-6 text-white text-xl font-bold"
          >
            <Arrow /> Edit Profile
          </Link>
          <button
            className="absolute top-6 right-6  bg-white p-1 rounded-full shadow-md"
            onClick={handleBannerClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-6.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L16.732 3.732z"
              />
            </svg>
          </button>
          <input
            ref={fileBannerRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleBannerChange}
          />
        </div>

        <div className="relative flex flex-row items-center px-2 -mt-16">
          <div className="relative w-32 h-32 mt-5">
            <img
              src={profileData?.photoURL}
              referrerPolicy="no-referrer"
              alt="Profile"
              className="w-full h-full object-cover rounded-full  shadow-md"
            />
            <button
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-6.036a2.5 2.5 0 113.536 3.536L6.5 21H3v-3.5L16.732 3.732z"
                />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="py-2 px-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              id="name"
              name="username"
              placeholder="Sakshi Agarwal"
              className="mt-1 block w-full  outline-none border-b-2 border-cyan-950 shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Just someone who loves designing, sketching, and finding beauty in the little things 💕"
              rows={3}
              className="mt-1 block w-full outline-none border-b-2 border-cyan-950 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="p-4">
          <button
            className="w-full py-3 bg-black text-white font-bold rounded-full mt-40 shadow-md hover:bg-gray-800"
            onClick={onSubmit}
          >
            {isLoading ? "Updating" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
