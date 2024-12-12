import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

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

const App = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("User logged out");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Provider store={store}>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen w-screen hidden lg:flex xs:landscape:flex flex-col items-center justify-center bg-white">
        <Rotate className="flex-shrink-0 h-32 w-36" />
        <p className="mt-6 w-72 text-darkgray text-lg text-center">
          Please rotate your phone to access the application.
        </p>
      </div>

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
    </Provider>
  );
};

export default App;
