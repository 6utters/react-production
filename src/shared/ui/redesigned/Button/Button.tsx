import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { className, children, variant = 'outline', disabled, fullWidth, size = 'm', square, ...otherProps } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.full_width]: fullWidth
  }

  return (
    <button
      type='button'
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
})
