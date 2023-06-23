import { FC, memo, useMemo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemList = useSidebarItems()

  const onToggle = () => {
    setCollapsed((prevState) => !prevState)
  }

  const itemList = useMemo(
    () => sidebarItemList.map((item) => <SidebarItem key={item.path} item={item} collapsed={collapsed} />),
    [collapsed, sidebarItemList]
  )

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <aside
          data-testid='sidebar'
          className={classNames(cls.Sidebar_redesigned, { [cls.collapsed_redesigned]: collapsed }, [className])}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role='navigation' gap='8' className={cls.items}>
            {itemList}
          </VStack>
          <Icon
            clickable
            Svg={ArrowIcon}
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={cls.collapsed_btn}
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} short={collapsed} />
          </div>
        </aside>
      }
      off={
        <aside data-testid='sidebar' className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
          <Button
            data-testid='sidebar-toggle'
            onClick={onToggle}
            className={cls.collapsed_btn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role='navigation' gap='8' className={cls.items}>
            {itemList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={cls.lang} short={collapsed} />
          </div>
        </aside>
      }
    />
  )
})
