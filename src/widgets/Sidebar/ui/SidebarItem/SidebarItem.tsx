import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getAuthData } from '@/entities/User'
import { SidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
  const { item, collapsed } = props
  const { t } = useTranslation()
  const isAuth = useSelector(getAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <AppLink
          to={item.path}
          activeClassName={cls.active}
          className={classNames(cls.item_redesigned, { [cls.collapsed_redesigned]: collapsed })}
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          theme={AppLinkTheme.SECONDARY}
          to={item.path}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  )
})
