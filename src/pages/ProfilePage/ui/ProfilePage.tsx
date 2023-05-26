import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ProfilePageProps {
    className?: string
}

const initialReducers: ReducerList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames('', {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
