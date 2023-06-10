import React, {
  FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState
} from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import cls from './Modal.module.scss'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
  const {
    className, children, onClose, isOpen, lazy
  } = props

  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }

    return () => {
      setIsMounted(false)
    }
  }, [isOpen])

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timeRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timeRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
