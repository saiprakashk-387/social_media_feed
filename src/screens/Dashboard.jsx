import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import { auth } from "../utils/firebase";
import BannerWoman from "../assets/images/BannerWoman.png";
import Image1 from "../assets/images/Image1.png";
import Image2 from "../assets/images/Image2.png";
import FloatingIcon from "../assets/icons/Add Floating Button.svg";
import ShareIcon from "../assets/icons/ShareIcon.svg";
import { ReactComponent as Arrow } from "../assets/icons/Arrow.svg";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { GetPostService } from "../services/postService";

const Dashboard = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.users);
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPostService());
  }, []);

  console.log("dashboard posts", allPosts);

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
