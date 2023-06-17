import { createSelector } from '@reduxjs/toolkit'
import { UserRole } from '../../consts/userConsts'
import { getUserRoles } from '../getUserRoles/getUserRoles'

export const getIsUserManager = createSelector(getUserRoles, (roles) =>
  Boolean(roles?.includes(UserRole.MANAGER))
)
