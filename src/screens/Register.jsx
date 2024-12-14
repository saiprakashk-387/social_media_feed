import { useState } from "react";

import AuthBackground from "../assets/icons/AuthBackground.svg";
import AppContent from "../assets/images/Content.png";
import { ReactComponent as Loader } from "../assets/icons/Loader.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateAccountService } from "../services/userService";

const Register = () => {
  const GoogleSignInModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalStyle = isOpen ? "block" : "hidden";
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};
      if (!formData.username.trim()) {
        newErrors.username = "Name is required";
      }
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
    const onSumbit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        if (validate()) {
          await dispatch(CreateAccountService(formData))
            .then(() => {
              navigate("/dashboard");
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log("err", err);
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
              top: "45%",
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
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your name"
                />
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username}</p>
                )}
              </div>
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
                  onClick={onSumbit}
                >
                  Register
                </button>
              )}
              <div className="flex justify-between mt-2">
                <Link className="text-blue-500" to="/">
                  Go Back
                </Link>
                <Link className="text-blue-500" to="/login">
                  Already have account? Login
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

export default Register;
