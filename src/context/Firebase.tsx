import { createContext, PropsWithChildren } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseConfig } from "@/config/Firebase";
import { ContextFirebase } from "@/interfaces/firebase";

const FirebaseContext = createContext<Partial<ContextFirebase>>({})

const FirebaseProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

  const app = initializeApp(FirebaseConfig);
  const db = getFirestore(app)
  const storage = getStorage()
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  return (
    <FirebaseContext.Provider value={{
      app,
      db,
      storage,
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseContext }
export default FirebaseProvider