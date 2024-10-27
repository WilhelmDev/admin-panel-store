import { FirebaseContext } from "@/context/Firebase"
import { ContextFirebase } from "@/interfaces/firebase"
import { useContext } from "react"

const useFirebase = () => {
  return (
    useContext(FirebaseContext)
  ) as ContextFirebase
}

export default useFirebase