import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { addUser, getUser, updateUser } from "../features/userSlice";
export const AddList = (data) => async (dispatch) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User is not authenticated.");
            return;
        }
        //   dispatch(IsLoading(true));
        const docRef = await addDoc(collection(db, "users"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch(addUser(data))
        //   dispatch(IsLoading(false));
    } catch (err) {
        alert(err.message);
    }
};


export const SigninWithGoogle = () => async () => {
    // setLoading(true);
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            bio: '',
            bannerImage: '',
            createdAt: new Date(),
        });

    } catch (err) {
        console.error(err);
    } finally {
        // setLoading(false);
    }
};


export const updateProfile = (data) => async (dispatch) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert("User is not authenticated.");
            return;
        }

        // Reference to user's document
        const userDocRef = doc(db, "users", user.uid);
        console.log('update', data);
        // Update fields
        await updateDoc(userDocRef, data);
  
        dispatch(updateUser(data))

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
        //   dispatch(IsLoading(true));
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        console.log(userDoc.data());
        
        dispatch(getUser(userDoc.data()))
        //   dispatch(IsLoading(false));
    } catch (err) {
        alert(err.message);
    }
};