import React, { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean
}

/**
 * Use new UI components from redesigned
 * @deprecated
 */
export const Icon: FC<IconProps> = memo((props) => {
  const { Svg, className, inverted, ...otherProps } = props
  return <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} {...otherProps} />
})
