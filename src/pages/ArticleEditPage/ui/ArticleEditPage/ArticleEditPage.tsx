import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/ui/Page'
import { useParams } from 'react-router-dom'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage: FC<ArticleEditPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const { id } = useParams<{id: string}>()
  const isEdit = Boolean(id)

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit ? `Editing article${id}` : 'creating new article'}
    </Page>
  )
}

export default memo(ArticleEditPage)
