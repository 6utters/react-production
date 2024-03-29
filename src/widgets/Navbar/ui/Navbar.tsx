import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { LoginModal } from '@/features/AuthByUsername'
import { getAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { NotificationButton } from '@/features/NotificationButton'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { getRouteArticleCreate } from '@/shared/const/router'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import cls from './Navbar.module.scss'
import { Button } from '@/shared/ui/redesigned/Button'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getAuthData)

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar
  })

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text className={cls.app_name} title={t('Production App')} theme={TextTheme.INVERTED} />
            <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY}>
              {t('Создать статью')}
            </AppLink>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    )
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Button className={cls.links} variant='clear' onClick={onShowModal}>
            {t('Войти')}
          </Button>
        }
        off={
          <ButtonDeprecated className={cls.links} theme={ButtonTheme.CLEAR_INVERTED} onClick={onShowModal}>
            {t('Войти')}
          </ButtonDeprecated>
        }
      />

      {isAuthModal && <LoginModal isOpen={isAuthModal} onCLose={onCloseModal} />}
    </header>
  )
})
