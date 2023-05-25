import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'

interface ProfilePageProps {
    className?: string
}

const initialReducers: ReducerList = {
  profile: profileReducer
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames('', {}, [className])}>
        {t('Страница профиля')}
      </div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
