import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'

interface DetailsContainerProps {
  className?: string
}

export const DetailsContainer: FC<DetailsContainerProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  return (
    <Card max border='rounded' className={className} padding='24'>
      <ArticleDetails id={id} />
    </Card>
  )
})
