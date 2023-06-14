import {
  CSSProperties, FC, memo, useMemo
} from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '../AppImage'
import UserIcon from '../../assets/icons/user-filled.svg'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    fallbackInverted?: boolean
}

export const Avatar: FC<AvatarProps> = memo(({
  className, src, size, alt, fallbackInverted
}) => {
  const mods: Mods = {}

  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size
  }), [size])

  const fallback = <Skeleton width={size} height={size} border="50%" />
  const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />

  return (
    <AppImage
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  )
})
