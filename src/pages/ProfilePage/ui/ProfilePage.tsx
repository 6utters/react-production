import {
  FC, memo, useCallback, useEffect
} from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  fetchProfileData,
  getProfileForm,
  getProfileError,
  getProfileIsLoading,
  getProfileReadonly, profileActions,
  ProfileCard,
  profileReducer
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

interface ProfilePageProps {
    className?: string
}

const initialReducers: ReducerList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const readonly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  const onChangeFirstname = useCallback((firstname?: string) => {
    dispatch(profileActions.updateProfile({ firstname: firstname || '' }))
  }, [dispatch])

  const onChangeLastname = useCallback((lastname?: string) => {
    dispatch(profileActions.updateProfile({ lastname: lastname || '' }))
  }, [dispatch])

  const onChangeAge = useCallback((age?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(age || 0) }))
  }, [dispatch])

  const onChangeAvatar = useCallback((avatar?: string) => {
    dispatch(profileActions.updateProfile({ avatar: avatar || '' }))
  }, [dispatch])

  const onChangeUsername = useCallback((username?: string) => {
    dispatch(profileActions.updateProfile({ username: username || '' }))
  }, [dispatch])

  const onChangeCurrency = useCallback((currency?: Currency) => {
    dispatch(profileActions.updateProfile({ currency }))
  }, [dispatch])

  const onChangeCountry = useCallback((country?: Country) => {
    dispatch(profileActions.updateProfile({ country }))
  }, [dispatch])

  const onChangeCity = useCallback((city?: string) => {
    dispatch(profileActions.updateProfile({ city: city || '' }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeAvatar}
          onChangeAvatar={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
