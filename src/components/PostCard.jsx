import React, { useState } from "react";
import Image1 from "../assets/images/Image1.png";
import Image2 from "../assets/images/Image2.png";
import ProfileIcon from "../assets/images/ProfileIcon.png";
import ShareIcon from "../assets/icons/ShareIcon.svg";
import ShareModal from "./ShareModel";
import { dateFormat } from "../utils/dateFormat";

const PostCard = ({postItem}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="max-w-md mx-auto my-4 bg-[#F7EBFF] border border-gray-200 rounded-lg shadow-md">
        <div className="flex items-center p-4">
          <img
            src={postItem?.postBy?.photoURL}
            alt="Profile"
            className="w-12 h-12 rounded-full"
            referrerPolicy="no-referrer"
          />
          <div className="ml-3">
            <h2 className="text-sm font-bold text-gray-800">{postItem?.postBy?.name}</h2>
            <p className="text-xs text-gray-500">{dateFormat(postItem?.createdAt.toDate())}</p>
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm text-gray-800">
           {postItem?.desc}
            <br />
            {/* <span className="text-blue-500">#NYC #Travel</span> */}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          <img
            src={postItem?.imageURL}
            alt="Statue of Liberty"
            className="object-cover w-full h-40 rounded-lg"
          />
          {/* <img
            src={Image2}
            alt="NYC Street"
            className="object-cover w-full h-40 rounded-lg"
          /> */}
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-pink-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="ml-1 text-sm">67</span>
            </button>
          </div>
          <button
            className="flex items-center px-3 py-1 text-sm font-medium rounded-full"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={ShareIcon}
              alt="share"
              class="w-full m-auto justify-center"
            />
          </button>
        </div>
        <ShareModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div>
      {/* <div className="max-w-md mx-auto my-4 bg-[#F7EBFF] border border-gray-200 rounded-lg shadow-md">
        <div className="flex items-center p-4">
          <img
            src={ProfileIcon}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-3">
            <h2 className="text-sm font-bold text-gray-800">Aarav</h2>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm text-gray-800">
            Just arrived in New York City! Excited to explore the sights,
            sounds, and energy of this amazing place. 🗽
            <br />
            <span className="text-blue-500">#NYC #Travel</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          <img
            src={Image1}
            alt="Statue of Liberty"
            className="object-cover w-full h-40 rounded-lg"
          />
          <img
            src={Image2}
            alt="NYC Street"
            className="object-cover w-full h-40 rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-pink-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="ml-1 text-sm">67</span>
            </button>
          </div>
          <button
            className="flex items-center px-3 py-1 text-sm font-medium rounded-full"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={ShareIcon}
              alt="share"
              class="w-full m-auto justify-center"
            />
          </button>
        </div>
        <ShareModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div> */}
    </>
  );
};

export default PostCard;
