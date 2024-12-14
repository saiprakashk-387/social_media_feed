import { useState } from "react";
import { toast } from "react-toastify";
import AuthBackground from "../assets/icons/AuthBackground.svg";
import AppContent from "../assets/images/Content.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const SignIn = () => {
  const GoogleSignInModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const modalStyle = isOpen ? "block" : "hidden";
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email format is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (validate()) {
          await signInWithEmailAndPassword(
            auth,
            formData?.email,
            formData?.password
          );
          navigate("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        toast.error("Invalid credentials");
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
              top: "50%",
            }}
          >
            <img
              src={AppContent}
              alt="check"
              class="w-10/12 m-auto justify-center"
            />
            <div
              className="mt-2"
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </div>
              {isLoading ? (
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                  <Loader className="w-full h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
              {/* <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                onClick={handleLogin}
              >
                Login
              </button> */}
              <div className="flex justify-between mt-2">
                <Link className="text-blue-500" to="/">
                  Go Back
                </Link>
                <Link className="text-blue-500" to="/forgot">
                  Forgot Password
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

export default SignIn;
