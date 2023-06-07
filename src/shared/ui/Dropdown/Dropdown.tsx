import { FC, Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DropdownDirection } from 'shared/types/ui'
import { AppLink } from '../AppLink/AppLink'
import cls from './Dropdown.module.scss'

export interface DropdownItem {
    disabled?: boolean
    content?: ReactNode
    onCLick?: () => void
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger: ReactNode
    direction?: DropdownDirection
}

const madDirectionClass: Record<DropdownDirection, string> = {
  'top left': cls.option_top_left,
  'top right': cls.option_top_right,
  'bottom left': cls.option_bottom_left,
  'bottom right': cls.option_bottom_right
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    className, trigger, items, direction = 'bottom right'
  } = props

  const additionalClasses = [madDirectionClass[direction]]

  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, additionalClasses)}>
        {items.map((item) => {
          const content = ({ active }: {active: boolean}) => (
            <button
              type="button"
              className={classNames(cls.item, { [cls.active]: active })}
              onClick={item.onCLick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
