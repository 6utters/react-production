import { rtkApi } from '@/shared/api/rtkApi'
import { User } from '../model/types/user'
import { JsonSettings } from '../model/types/jsonSettings'

interface SetJsonSettingsArg {
  userId: string
  jsonSettings: JsonSettings
}

const UserApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings
        }
      })
    }),
    getUserDataById: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const setJsonSettings = UserApi.endpoints.setJsonSettings.initiate
export const getUserDataById = UserApi.endpoints.getUserDataById.initiate
