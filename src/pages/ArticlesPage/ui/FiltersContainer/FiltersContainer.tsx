import { FC, memo } from 'react'
import { ArticlesFilters } from '@/widgets/ArticlesFilters'
import { useArticleFilters } from '../../lib/hooks/useArticleFilters'

interface FiltersContainerProps {
  className?: string
}

export const FiltersContainer: FC<FiltersContainerProps> = memo((props) => {
  const { className } = props
  const { onChangeType, onChangeSort, sort, type, onChangeSearch, search, order, onChangeOrder } = useArticleFilters()

  return (
    <ArticlesFilters
      search={search}
      onChangeSearch={onChangeSearch}
      onChangeType={onChangeType}
      onChangeOrder={onChangeOrder}
      onChangeSort={onChangeSort}
      sort={sort}
      order={order}
      type={type}
      className={className}
    />
  )
})
