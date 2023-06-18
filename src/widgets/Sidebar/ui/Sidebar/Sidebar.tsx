import { FC, memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppLogo } from '@/shared/ui/AppLogo'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemList = useSelector(getSidebarItems)

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
          className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}
        >
          <AppLogo className={cls.appLogo} />
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
