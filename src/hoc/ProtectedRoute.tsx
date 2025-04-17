import { ReactNode } from "react"
import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode
    requiredRole?: string
}

const ProtectedRoute = ({ children, requiredRole } : ProtectedRouteProps) => {
  const { user, isAuthorized } = useAuth()
  if (!user || (requiredRole && !isAuthorized(requiredRole))) {
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
