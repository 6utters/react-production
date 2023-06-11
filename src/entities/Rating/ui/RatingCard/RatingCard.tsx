import {
  FC, memo, useCallback, useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { Card } from '@/shared/ui/Card/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Drawer } from '@/shared/ui/Drawer/Drawer'
import cls from './RatingCard.module.scss'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starCount: number) => void
    onAccept?: (startCount: number, feedback?: string) => void
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const {
    className, feedbackTitle, hasFeedback, onAccept, onCancel, title
  } = props
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <>
      <Text text={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Ваш отзыв')}
      />
    </>
  )

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack align="center" gap="8">
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} />
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack gap="32" max>
              {modalContent}
              <HStack max gap="16" justify="end">
                <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                  {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandler}>
                  {t('Отправить')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy>
            <VStack gap="32">
              {modalContent}
              <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
                {t('Отправить')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </VStack>
    </Card>
  )
})
