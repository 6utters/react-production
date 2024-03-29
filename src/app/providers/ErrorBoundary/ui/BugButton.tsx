import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/deprecated/Button'

export const BugButton: FC = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(false)

  const onToggle = () => {
    setError(true)
  }

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return <Button onClick={onToggle}>{t('Прокинуть ошибку')}</Button>
}
