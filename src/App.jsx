import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ReactComponent as Rotate } from "./assets/icons/Rotate.svg";
import Login from "./screens/Login";
import MyAccount from "./screens/MyAccount";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import AddPost from "./screens/AddPost";
import store from "./features";
import DrawerLayout from "./components/DrawerLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import AuthRoute from "./routes/AuthRoute";
import UnAuthRoute from "./routes/UnAuthRoute";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
import Forgot from "./screens/Forgot";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const {loading} = useSelector((state) => state.common)
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen w-screen hidden lg:flex xs:landscape:flex flex-col items-center justify-center bg-white">
        <Rotate className="flex-shrink-0 h-32 w-36" />
        <p className="mt-6 w-72 text-darkgray text-lg text-center">
          Please rotate your phone to access the application.
        </p>
      </div>
      <ToastContainer />
      {loading && <LoadingScreen />}
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <UnAuthRoute>
                  <Login />
                </UnAuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <UnAuthRoute>
                  <Register />
                </UnAuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <UnAuthRoute>
                  <SignIn />
                </UnAuthRoute>
              }
            />
            <Route
              path="/forgot"
              element={
                <UnAuthRoute>
                  <Forgot />
                </UnAuthRoute>
              }
            />
            <Route element={<DrawerLayout />}>
              <Route
                path="/dashboard"
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
            </Route>
            <Route
              path="/my-account"
              element={
                <AuthRoute>
                  <MyAccount />
                </AuthRoute>
              }
            />
            <Route
              path="/my-profile"
              element={
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              }
            />

            <Route
              path="/add-post"
              element={
                <AuthRoute>
                  <AddPost />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
