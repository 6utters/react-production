import { FC, ReactNode } from 'react'
import { Popover as HPopover } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import cls from './Popover.module.scss'
import popupCls from '../../styles/Popup.module.scss'
import { mapDirectionClass } from '../../styles/consts'

interface PopoverProps {
  className?: string
  trigger: ReactNode
  direction?: DropdownDirection
  children: ReactNode
}

export const Popover: FC<PopoverProps> = (props) => {
  const { className, trigger, direction = 'bottom right', children } = props

  const additionalClasses = [mapDirectionClass[direction], popupCls.menu]

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.Popup])}>
      <HPopover.Button as='div' className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, additionalClasses)}>{children}</HPopover.Panel>
    </HPopover>
  )
}
