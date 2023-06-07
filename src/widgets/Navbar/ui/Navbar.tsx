import {
  FC, memo, useCallback, useState
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthData, userActions } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getAuthData)

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

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
        <Dropdown
          direction="bottom left"
          className={cls.dropdown}
          items={[
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id
            },
            {
              content: t('Выйти'),
              onCLick: onLogout
            }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
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
