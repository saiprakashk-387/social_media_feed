import { useState } from "react";

import AuthBackground from "../assets/icons/AuthBackground.svg";
import AppContent from "../assets/images/Content.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";

const Forgot = () => {
  const GoogleSignInModal = ({ isOpen, onClose }) => {
    const modalStyle = isOpen ? "block" : "hidden";
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email format is invalid";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleReset = async (e) => {
      e.preventDefault();
      if (validate()) {
        try {
          setLoading(true);
          await sendPasswordResetEmail(auth, formData.email);
          toast.success("Password reset email sent! Check your inbox.");
        } catch (err) {
          alert(err.message);
          if (err.code === "auth/user-not-found") {
            toast.error("No user found with this email.");
          } else if (err.code === "auth/invalid-email") {
            toast.error("Please enter a valid email address.");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
      // try {
      //   setLoading(true);
      //   await sendPasswordResetEmail(auth, formData.email);
      //   toast.success("Password reset email sent! Check your inbox.");
      // } catch (err) {
      //   alert(err.message);
      //   if (err.code === "auth/user-not-found") {
      //     toast.error("No user found with this email.");
      //   } else if (err.code === "auth/invalid-email") {
      //     toast.error("Please enter a valid email address.");
      //   } else {
      //     toast.error("Something went wrong. Please try again.");
      //   }
      //   setLoading(false);
      // }
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
              top: "50%",
            }}
          >
            <img
              src={AppContent}
              alt="check"
              class="w-10/12 m-auto justify-center"
            />
            <div
              className="mt-6"
              //  onSubmit={onSumbit}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </div>
              {isLoading ? (
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                  <Loader className="w-full h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  onClick={handleReset}
                >
                  Send Email
                </button>
              )}
              {/* <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                                onClick={handleReset}
                            >
                                Send Email
                            </button> */}
              <div className="flex justify-center mt-2">
                <Link className="text-blue-500" to="/login">
                  Go to Login
                </Link>
              </div>
            </div>
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

export default Forgot;
