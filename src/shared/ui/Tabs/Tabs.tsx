import { FC, memo, ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'
import cls from './Tabs.module.scss'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
}

export const Tabs: FC<TabsProps> = memo((props) => {
  const { className, tabs, onTabClick, value } = props

  const clickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          onClick={clickHandler(tab)}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
          className={cls.tab}
          key={tab.value}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
})
