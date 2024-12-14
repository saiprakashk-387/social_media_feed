import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as updateCurrentUser,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getUser, updateUser } from "../features/userSlice";
import { showLoading } from "../features/commonSlice";
import { toast } from "react-toastify";

export const SigninWithGoogle = () => async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      bio: "",
      bannerImage: "",
      createdAt: new Date(),
    });
  } catch (err) {
    console.error(err);
  }
};

export const CreateAccountService = (data) => async (dispatch) => {
  dispatch(showLoading(true));
  await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userData) => {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user?.uid);
      setDoc(userDocRef, {
        name: data.username,
        email: userData?.user?.email,
        photoURL:
          "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png",
        bio: "",
        bannerImage: "",
        createdAt: new Date(),
      });
      dispatch(showLoading(false));
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("User is not authenticated.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, data);

    dispatch(updateUser(data));
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const GetUserService = () => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    dispatch(getUser(userDoc?.data()));
  } catch (err) {
    alert(err.message);
  }
};
