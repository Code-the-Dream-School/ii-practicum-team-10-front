import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth invalid");
  }
  const {
    user,
    setUser,
    login,
    register,
    logout,
    isLoading,
    selectedClass,
    setSelectedClass,
    selectedClassChallenge,
    setSelectedClassChallenge,
  } = context;

  const isAuthorized = (neededRole: string) => {
    if (!user) return false;

    const roleHierarchy: Record<string, number> = {
      user: 1,
      admin: 2,
    };

    return roleHierarchy[user.role] >= roleHierarchy[neededRole];
    // return user && user.role === neededRole
  };

  return {
    user,
    setUser,
    login,
    register,
    logout,
    isAuthorized,
    isLoading,
    selectedClass,
    setSelectedClass,
    selectedClassChallenge,
    setSelectedClassChallenge,
  };
};

export default useAuth;
