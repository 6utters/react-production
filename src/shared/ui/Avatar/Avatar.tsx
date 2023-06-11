import {
  CSSProperties, FC, memo, useMemo
} from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar: FC<AvatarProps> = memo(({
  className, src, size, alt
}) => {
  const mods: Mods = {}

  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100
  }), [size])

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  )
})
