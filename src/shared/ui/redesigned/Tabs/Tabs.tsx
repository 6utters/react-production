import { FC, memo, ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '../Card/Card'
import cls from './Tabs.module.scss'
import { Flex, FlexDirection } from '../Stack/Flex/Flex'

export interface TabItem {
  value: string
  content: ReactNode
}

interface TabsProps {
  className?: string
  tabs: TabItem[]
  value: string
  onTabClick: (tab: TabItem) => void
  direction?: FlexDirection
}

export const Tabs: FC<TabsProps> = memo((props) => {
  const { className, tabs, onTabClick, direction = 'row', value } = props

  const clickHandler = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab)
    },
    [onTabClick]
  )

  return (
    <Flex align='start' gap='8' direction={direction} className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => {
        const isSelected = tab.value === value
        return (
          <Card
            onClick={clickHandler(tab)}
            variant={tab.value === value ? 'light' : 'normal'}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            key={tab.value}
            border='rounded'
          >
            {tab.content}
          </Card>
        )
      })}
    </Flex>
  )
})
