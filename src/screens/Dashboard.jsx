import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FloatingIcon from "../assets/icons/Add Floating Button.svg";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { GetPostService } from "../services/postService";
import { GetUserService } from "../services/userService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPostService());
    dispatch(GetUserService());
  }, []);

  return (
    <section className="px-2 py-2">
      <h1 className="text-[#000000] text-2xl font-semibold">Feeds</h1>
      {allPosts && allPosts.map((post) => <PostCard postItem={post} />)}

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
    </section>
  );
};

export default Dashboard;
