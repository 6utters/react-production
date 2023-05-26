import {
  ButtonHTMLAttributes, FC, memo, ReactNode
} from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear_inverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'background_inverted'
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
    children?: ReactNode
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className, children, theme = ButtonTheme.OUTLINE, disabled, size = ButtonSize.M, square, ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
})
