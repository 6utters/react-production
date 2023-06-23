import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Text } from '@/shared/ui/deprecated/Text'
import { saveJsonSettings, useJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageHasBeenOpened } = useJsonSettings()

  useEffect(() => {
    if (!isArticlesPageHasBeenOpened) {
      setIsOpen(true)
      dispatch(saveJsonSettings({ isArticlesPageHasBeenOpened: true }))
    }
  }, [dispatch, isArticlesPageHasBeenOpened])

  const onClose = () => setIsOpen(false)

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <Text
        title={t('Добро пожадлвать на страницу статей')}
        text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
      />
    </Modal>
  )
})
