import { FC, ReactNode, memo } from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import { Portal } from '@headlessui/react'
import { Overlay } from '../Overlay/Overlay'
import cls from './Drawer.module.scss'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Drawer: FC<DrawerProps> = memo((props) => {
  const {
    children, className, isOpen, onClose
  } = props

  const mods: Mods = {
    [cls.opened]: isOpen
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <Overlay onClick={onClose} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
})
