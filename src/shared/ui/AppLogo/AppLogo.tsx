import { FC, memo } from 'react'
import { HStack } from '../Stack'
import AppSvg from '@/shared/assets/icons/app-image.svg'
import cls from './AppLogo.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface AppLogoProps {
  className?: string
}

export const AppLogo: FC<AppLogoProps> = memo((props) => {
  const { className } = props
  return (
    <HStack max justify='center' className={classNames(cls.AppLogoWrapper, {}, [className])}>
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg className={cls.appLogo} />
    </HStack>
  )
})
