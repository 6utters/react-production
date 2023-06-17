import { HTMLAttributes, FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
  theme?: CardTheme
  max?: boolean
}

export const Card: FC<CardProps> = (props) => {
  const {
    children,
    className,
    theme = CardTheme.NORMAL,
    max,
    ...otherProps
  } = props
  return (
    <div
      className={classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[theme]
      ])}
      {...otherProps}
    >
      {children}
    </div>
  )
}
