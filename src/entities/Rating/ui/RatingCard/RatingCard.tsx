import { FC, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { Drawer } from '@/shared/ui/Drawer'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starCount: number) => void
  onAccept?: (startCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const {
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title,
    rate = 0
  } = props
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount)
      if (hasFeedback) {
        setIsModalOpen(true)
      } else {
        onAccept?.(selectedStarsCount)
      }
    },
    [hasFeedback, onAccept]
  )

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
        data-testid='RatingCard.Input'
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Ваш отзыв')}
      />
    </>
  )

  return (
    <Card className={className} max data-testid='RatingCard'>
      <VStack align='center' gap='8' max>
        <Text title={starsCount ? t('Спасибо за оценку') : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap='32' max>
            {modalContent}

            <HStack max gap='16' justify='end'>
              <Button
                onClick={cancelHandler}
                theme={ButtonTheme.OUTLINE_RED}
                data-testid='RatingCard.Close'
              >
                {t('Закрыть')}
              </Button>
              <Button data-testid='RatingCard.Send' onClick={acceptHandler}>
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy>
          <VStack gap='32'>
            {modalContent}
            <Button fullWidth onClick={acceptHandler} size={ButtonSize.L}>
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  )
})
