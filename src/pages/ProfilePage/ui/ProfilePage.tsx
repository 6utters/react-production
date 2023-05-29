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
  profileReducer,
  getProfileValidateErrors,
  ValidateProfileError
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'

interface ProfilePageProps {
    className?: string
}

const initialReducers: ReducerList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const validateErrorTranslations = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_CITY]: t('Некорректный город'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректая валюта'),
    [ValidateProfileError.INCORRECT_AVATAR]: t('Некорректная аватарка'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Некорректное имя пользователя'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка')
  }

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData())
    }
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
        {validateErrors?.length && validateErrors.map((err) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslations[err]}
          />
        ))}
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
