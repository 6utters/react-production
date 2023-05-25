import { FC, Suspense } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Modal } from 'shared/ui/Modal/Modal'
import { Loader } from 'shared/ui/Loader/Loader'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

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
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onCLose} />
      </Suspense>
    </Modal>
  )
}
