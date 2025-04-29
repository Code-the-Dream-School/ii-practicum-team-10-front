import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"

const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context){
    throw new Error("useAuth invalid")
  }
  const { user, login, register, logout, isLoading, selectedClass, setSelectedClass, selectedClassChallenge, setSelectedClassChallenge } = context

  const isAuthorized = (neededRole: string) => {
    return user && user.role === neededRole
  }

  return { user, login, register, logout, isAuthorized, isLoading, selectedClass, setSelectedClass, selectedClassChallenge, setSelectedClassChallenge }
}

export default useAuth
