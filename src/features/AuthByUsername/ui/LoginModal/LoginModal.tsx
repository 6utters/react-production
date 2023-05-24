import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
    className?: string
    isOpen?: boolean
    onCLose?: () => void
}

export const LoginModal: FC<LoginModalProps> = (props) => {
  const { className, onCLose, isOpen } = props
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onCLose}
      lazy
    >
      <LoginForm />
    </Modal>
  )
}
