import { FC, Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'
import { madDirectionClass } from '../../styles/consts'
import cls from './Dropdown.module.scss'
import popupCls from '../../styles/Popup.module.scss'

export interface DropdownItem {
  disabled?: boolean
  content?: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { className, trigger, items, direction = 'bottom right' } = props

  const additionalClasses = [madDirectionClass[direction]]

  return (
    <Menu
      as='div'
      className={classNames(cls.Dropdown, {}, [className, popupCls.Popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, additionalClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type='button'
              className={classNames(cls.item, { [popupCls.active]: active })}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item
                key={`dropdown-key-${index}`}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item
              key={`dropdown-key-${index}`}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
