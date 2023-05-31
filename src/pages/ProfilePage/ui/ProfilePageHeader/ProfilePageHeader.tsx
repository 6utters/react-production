import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { useSelector } from 'react-redux'
import {
  getProfileData, getProfileReadonly, profileActions, updateProfileData
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getAuthData } from 'entities/User'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
  const {
    className
  } = props
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const readonly = useSelector(getProfileReadonly)
  const profileData = useSelector(getProfileData)
  const authData = useSelector(getAuthData)

  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        <div className={cls.btn_wrapper}>
          {readonly ? (
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.edit_btn}
              onClick={onEdit}
            >
              {t('Редактировать')}
            </Button>
          )
            : (
              <>
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  className={cls.edit_btn}
                  onClick={onCancel}
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ButtonTheme.OUTLINE}
                  className={cls.save_btn}
                  onClick={onSave}
                >
                  {t('Сохранить')}
                </Button>
              </>
            )}
        </div>
      )}
    </div>
  )
}
