import { HTMLAttributes, FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export type CardVariant = 'normal' | 'outline' | 'light'
export type CardPaddings = '0' | '8' | '16' | '24'
export type CardBorder = 'rounded' | 'basic' | 'partial'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  variant?: CardVariant
  max?: boolean
  padding?: CardPaddings
  border?: CardBorder
}

const mapPaddingToClass: Record<CardPaddings, string> = {
  '0': 'padding_0',
  '8': 'padding_8',
  '16': 'padding_16',
  '24': 'padding_24'
}

export const Card: FC<CardProps> = (props) => {
  const { children, className, border = 'basic', padding = '8', variant = 'normal', max, ...otherProps } = props

  const paddingsClass = mapPaddingToClass[padding]

  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [className, cls[variant], cls[paddingsClass], cls[border]])}
      {...otherProps}
    >
      {children}
    </div>
  )
}
