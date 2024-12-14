import { useState } from "react";

import AuthBackground from "../assets/icons/AuthBackground.svg";
import AppContent from "../assets/images/Content.png";
import GoogleButton from "../assets/images/Googlesignin.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SigninWithGoogle } from "../services/userService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoogleSignInModal = ({ isOpen, onClose }) => {
    const modalStyle = isOpen ? "block" : "hidden";
    const [isLoading, setLoading] = useState(false);
    const handleGoogleSignIn = async () => {
      try {
        setLoading(true);
        dispatch(SigninWithGoogle()).then(() => {
          navigate("/");
        });
      } catch (err) {
        console.log("Google-signin-error", err);
        setLoading(false);
      }
    };
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
              top: "60%",
            }}
          >
            <img
              src={AppContent}
              alt="check"
              class="w-10/12 m-auto justify-center"
            />
            <>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4 rounded-[35px] text-white py-4 px-4 "
              >
                Login With Email
              </button>
              <div className="text-gray-500 text-center my-4">or</div>
              {isLoading ? (
                <button className="w-full relative  right-0 text-white  bg-[#264488] border rounded-[35px]">
                  <Loader className="w-full p-2 h-12" />
                </button>
              ) : (
                <button
                  className="w-full relative  right-0 text-white  bg-[#264488] border rounded-[35px]"
                  onClick={() => handleGoogleSignIn()}
                >
                  <img
                    src={GoogleButton}
                    alt="Google"
                    class="w-full m-auto justify-center"
                  />
                </button>
              )}
            </>
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
