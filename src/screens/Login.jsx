import { useEffect, useRef, useState } from "react";

import AuthBackground from "../assets/icons/AuthBackground.svg";
import AppContent from "../assets/images/Content.png";
import GoogleButton from "../assets/images/Googlesignin.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { SigninWithGoogle } from "../services/userService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { referal } = useParams();
  // const [isModalOpen, setModalOpen] = useState(true);
  // const [isLoading, setLoading] = useState(false);;


  const GoogleSignInModal = ({ isOpen, onClose }) => {
    const modalStyle = isOpen ? "block" : "hidden";
    // const SigninWithGoogle = () => {
    //   const provider = new GoogleAuthProvider();
    //   signInWithPopup(auth, provider).then(async (res) => {
    //     if (res.user) navigate("/", { replace: true });
    //     console.log("rss", res);
    //   });
    //   // navigate("/", { replace: true })
    // };

    return (
      <div className={`fixed inset-0 overflow-y-auto ${modalStyle}`}>
        <div className=" items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="bg-white p-8 rounded shadow-lg w-full overflow-y-auto"
            style={{
              position: "absolute",
              borderTopLeftRadius: "65px",
              borderTopRightRadius: "65px",
              bottom: 0,
              top: "70%",
            }}
          >
            <img
              src={AppContent}
              alt="check"
              class="w-10/12 m-auto justify-center"
            />
            <button
              className="w-full relative  right-0 text-white  bg-[#264488] border rounded-[35px] mt-10"
              onClick={() => dispatch(SigninWithGoogle()).then(() => {
                navigate('/')
              })}
            >
              <img
                src={GoogleButton}
                alt="Google"
                class="w-full m-auto justify-center"
              />
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen flex flex-col items-stretch justify-start bg-white">
      <img
        className="flex-[0.5] w-full object-cover"
        src={AuthBackground}
        alt="banner"
      />
      <div className="flex-shrink-0 p-8">
        <GoogleSignInModal isOpen={true} onClose={false} />
      </div>
    </div>
  );
};

export default Login;
