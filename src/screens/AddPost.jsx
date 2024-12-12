import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/icons/BlackBackArrow.svg";
import { CreatePostService } from "../services/postService";
import { useDispatch } from "react-redux";

const AddPost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    imageURL: "",
    desc: "",
  });
  const fileBannerRef = useRef(null);
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
        console.log("imageslist", imageslist);
        setPostData({
          ...postData,
          imageURL: imageslist
        });
      };
    });
  };

  const onSubmit = () => {
    dispatch(CreatePostService(postData)).then(() => {
      navigate(-1)
    })
  };

  console.log(postData)
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 my-2">

        <Arrow className="shrink-0 text-black w-20 h-30" onClick={()=> navigate(-1)}/>
        <h1 className="ml-4 text-lg font-semibold text-gray-900">New Post</h1>

      </div>

      {/* Image Section */}
      <div className="flex-grow p-4">
        <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md" onClick={handleBannerClick}>
          <img
            src={postData?.imageURL ? postData?.imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWn29_dfbByEYpOGzX0nwdyCE0WwS4vhwqlWw4cYP51DvunpV9WffbgfwGXmLBgbkGDk&usqp=CAU"}
            alt="Post Preview"
            className="w-full h-auto object-cover"
          />
          {/* Badge */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-medium px-2 py-1 rounded-full">
            1/2
          </div>
          {/* Dot Indicator */}
          {/* <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full mx-1"></div>
          </div> */}
          <input
            ref={fileBannerRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleBannerChange}
          />
        </div>

        {/* Description */}
        <textarea
          id="desc"
          name="desc"
          value={postData.desc}
          onChange={(e) =>
            setPostData((prev) => ({ ...prev, desc: e.target.value }))
          }
          rows="5"
          placeholder="Surrounded by nature’s beauty, finding peace in every leaf, breeze, and sunset. 🌿🌞
#NatureVibes #OutdoorEscape #EarthLover"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
        />
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button className="w-full py-3 bg-black text-white font-bold rounded-full shadow-md hover:bg-gray-800" onClick={onSubmit}>
          CREATE
        </button>
      </div>
    </div>
  );
};

export default AddPost;
