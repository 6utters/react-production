import { FC, ReactNode, memo } from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import { Portal } from '@headlessui/react'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import cls from './Drawer.module.scss'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Drawer: FC<DrawerProps> = memo((props) => {
  const {
    children, className, isOpen, onClose, lazy
  } = props

  const { close, isClosing, isMounted } = useModal({
    animationDelay: 300,
    onClose,
    isOpen
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
})
