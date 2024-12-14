import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { addUser, getUser, updateUser } from "../features/userSlice";
import { CreatePost, GetPosts } from "../features/postSlice";
import { showLoading } from "../features/commonSlice";

export const CreatePostService = (data) => async (dispatch) => {
    // setLoading(true);
    const user = auth.currentUser;
    if (!user) {
        alert("User is not authenticated.");
        return;
    }
    try {
        dispatch(showLoading(true))
        const postDocRef = collection(db, "posts");
        const newPostDocRef = doc(postDocRef);
        await setDoc(newPostDocRef, {
            imageURL: data.imageURL,
            desc: data.desc,
            createdAt: new Date(),
            postBy: {
                name: data?.postBy?.name,
                photoURL: data?.postBy?.photoURL,
                email: data?.postBy?.email
            }
        });
        dispatch(CreatePost(data))
        dispatch(showLoading(false))
    } catch (err) {
        console.error(err);
    } finally {
        // setLoading(false);
        dispatch(showLoading(false))
    }
};

export const GetPostService = () => async (dispatch) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("User is not authenticated.");
            return;
        }
        dispatch(showLoading(true))
        const postsCollectionRef = collection(db, "posts");
        const querySnapshot = await getDocs(postsCollectionRef);

        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        dispatch(GetPosts(fetchedPosts))
        dispatch(showLoading(false))
        //   dispatch(IsLoading(false));
    } catch (err) {
        console.error(err.message);
        dispatch(showLoading(false))
    }
};