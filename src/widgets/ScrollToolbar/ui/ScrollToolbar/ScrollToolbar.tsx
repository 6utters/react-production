import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ScrollToolbar.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ScrollToTopButton } from '@/features/ScrollToTopButton'

interface ScrollToolbarProps {
  className?: string
}

export const ScrollToolbar: FC<ScrollToolbarProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation()
  return (
    <VStack justify='center' align='center' className={classNames(cls.ScrollToolbar, {}, [className])}>
      <ScrollToTopButton />
    </VStack>
  )
})
