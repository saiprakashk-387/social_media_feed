import React, { useState } from "react";

import { ReactComponent as Instagram } from "../assets/icons/instagram.svg";
import { ReactComponent as Telegram } from "../assets/icons/telegram.svg";
import { ReactComponent as Twitter } from "../assets/icons/twitter.svg";
import { ReactComponent as Whatsapp } from "../assets/icons/whatsapp.svg";
import { ReactComponent as Vector } from "../assets/icons/Vector.svg";
import { ReactComponent as Reddit } from "../assets/icons/reddit.svg";
import { ReactComponent as Discord } from "../assets/icons/discord.svg";
import { FacebookIcon, FacebookShareButton } from "react-share";

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Share post</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Sharing Options */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* {[
            { name: "Twitter", color: "text-blue-400", icon: "🐦" },
            { name: "Facebook", color: "text-blue-600", icon: "📘" },
            { name: "Reddit", color: "text-orange-500", icon: "👽" },
            { name: "Discord", color: "text-purple-500", icon: "🌀" },
            { name: "WhatsApp", color: "text-green-500", icon: "📞" },
            { name: "Messenger", color: "text-blue-400", icon: "📩" },
            { name: "Telegram", color: "text-blue-500", icon: "✈️" },
            { name: "Instagram", color: "text-pink-500", icon: "📷" },
          ].map((platform, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 ${platform.color}`}
              >
                <span className="text-lg">{platform.icon}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{platform.name}</p>
            </div>
          ))} */}
          <FacebookShareButton url={'https://jksplasters.com/'} quote={"title"}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        {/* Page Link */}
        <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
          <input
            type="text"
            value="https://www.arnav/feed"
            readOnly
            className="flex-1 text-sm text-gray-600 bg-transparent focus:outline-none"
          />
          <button
            className="px-2 py-1 ml-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() =>
              navigator.clipboard.writeText("https://www.arnav/feed")
            }
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
