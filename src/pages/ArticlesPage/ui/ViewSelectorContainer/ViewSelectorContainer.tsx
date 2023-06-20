import { FC, memo } from 'react'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface ViewSelectorContainerProps {
  className?: string
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = memo((props) => {
  const { className } = props
  const { view, onChangeView } = useArticleFilters()

  return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />
})
