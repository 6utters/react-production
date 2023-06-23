import { ButtonHTMLAttributes, FC, ForwardedRef, forwardRef, ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: ButtonVariant
  square?: boolean
  size?: ButtonSize
  color?: ButtonColor
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
  addonLeft?: ReactNode
  addonRight?: ReactNode
}

export const Button: FC<ButtonProps> = forwardRef((props, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    className,
    children,
    addonLeft,
    addonRight,
    variant = 'outline',
    disabled,
    fullWidth,
    color = 'normal',
    size = 'm',
    square,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.full_width]: fullWidth,
    [cls.with_addon]: Boolean(addonLeft) || Boolean(addonRight)
  }

  return (
    <button
      type='button'
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[color], cls[variant], cls[size]])}
      {...otherProps}
      ref={ref}
    >
      <div className={cls.addon_left}>{addonLeft}</div>
      {children}
      <div className={cls.addon_right}>{addonRight}</div>
    </button>
  )
})
