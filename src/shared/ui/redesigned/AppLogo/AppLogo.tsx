import { FC, memo } from 'react'
import { HStack } from '../Stack'
import AppSvg from '@/shared/assets/icons/app-image.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLogo.module.scss'

interface AppLogoProps {
  className?: string
  size?: number
}

export const AppLogo: FC<AppLogoProps> = memo((props) => {
  const { className, size = 50 } = props
  return (
    <HStack max justify='center' className={classNames(cls.AppLogoWrapper, {}, [className])}>
      <AppSvg width={size} height={size} color='black' className={cls.appLogo} />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  )
})
