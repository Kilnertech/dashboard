// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { callAPI, buildURL } from "api/callAPI";
import {firebaseConfig} from  "api/firebaseConfig";
import { useUser } from "context";

const rootAPI = "https://united-wavelet-422322-m7.uc.r.appspot.com/";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account",
});

const auth = getAuth(firebaseApp);
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const useHandleLoginWithGoogle = () => {
  const { login, userProfile } = useUser(); // Call the hook at the top level

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithGooglePopup();
      const token = await result.user.getIdToken();
      document.cookie = `token=${token}; path=/`;
      await callAPI(buildURL(rootAPI, "login"), "POST", { token });

      // Save user profile
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      login(userData); // Use the login function from the hook

      console.log(userProfile);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return handleLoginWithGoogle;
};

export { useHandleLoginWithGoogle };