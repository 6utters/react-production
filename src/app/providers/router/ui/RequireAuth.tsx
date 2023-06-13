import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getAuthData, getUserRoles, UserRole } from '@/entities/User'
import { RoutePath } from '@/shared/const/router'

interface RequireAuthProps {
    children: JSX.Element
  roles?: UserRole[]
}

export const RequireAuth: FC<RequireAuthProps> = ({ children, roles }) => {
  const auth = useSelector(getAuthData)
  const location = useLocation()
  const userRoles = useSelector(getUserRoles)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => userRoles?.includes(requiredRole))
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />
  }

  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
  }

  return children
}
