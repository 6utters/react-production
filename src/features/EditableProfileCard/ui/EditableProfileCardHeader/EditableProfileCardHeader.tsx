import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getAuthData } from '@/entities/User'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'
import { Card } from '@/shared/ui/redesigned/Card'

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> = memo((props) => {
  const { className } = props
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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card border='partial' padding='24' max>
          <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
              <>
                {readonly ? (
                  <Button onClick={onEdit} data-testid='EditableProfileCardHeader.EditButton'>
                    {t('Редактировать')}
                  </Button>
                ) : (
                  <HStack gap='8'>
                    <Button color='error' onClick={onCancel} data-testid='EditableProfileCardHeader.CancelButton'>
                      {t('Отменить')}
                    </Button>
                    <Button color='success' onClick={onSave} data-testid='EditableProfileCardHeader.SaveButton'>
                      {t('Сохранить')}
                    </Button>
                  </HStack>
                )}
              </>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack max justify='between' className={classNames('', {}, [className])}>
          <TextDeprecated title={t('Профиль')} />
          {canEdit && (
            <>
              {readonly ? (
                <ButtonDeprecated
                  theme={ButtonTheme.OUTLINE}
                  onClick={onEdit}
                  data-testid='EditableProfileCardHeader.EditButton'
                >
                  {t('Редактировать')}
                </ButtonDeprecated>
              ) : (
                <HStack gap='8'>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={onCancel}
                    data-testid='EditableProfileCardHeader.CancelButton'
                  >
                    {t('Отменить')}
                  </ButtonDeprecated>
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSave}
                    data-testid='EditableProfileCardHeader.SaveButton'
                  >
                    {t('Сохранить')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </>
          )}
        </HStack>
      }
    />
  )
})
