import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export type TextVariant = 'primary' | 'error' | 'accent'

export type TextAlign = 'left' | 'right' | 'center'

export type TextSize = 's' | 'm' | 'l'

interface TextProps {
  className?: string
  title?: string
  text?: string
  variant?: TextVariant
  align?: TextAlign
  size?: TextSize

  'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l'
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1'
}

export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'Text'
  } = props

  const HeaderTag = mapSizeToHeaderTag[size]
  const sizeClass = mapSizeToToClass[size]

  const additionalClasses = [className, cls[variant], cls[align], sizeClass]

  return (
    <div className={classNames(cls.Text, {}, additionalClasses)}>
      {title && (
        <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  )
})
