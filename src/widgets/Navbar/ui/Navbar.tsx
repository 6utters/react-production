import {
  FC, memo, useCallback, useState
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useSelector } from 'react-redux'
import { getAuthData } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HStack } from 'shared/ui/Stack'
import { NotificationButton } from 'features/NotificationButton'
import { AvatarDropdown } from 'features/AvatarDropdown'
import { Drawer } from 'shared/ui/Drawer/Drawer'
import { NotificationList } from 'entities/Notification'
import cls from './Navbar.module.scss'

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

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.app_name}
          title={t('Production App')}
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
        >
          {t('Создать статью')}
        </AppLink>
        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        className={cls.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      {isAuthModal && <LoginModal isOpen={isAuthModal} onCLose={onCloseModal} />}
    </header>
  )
})
