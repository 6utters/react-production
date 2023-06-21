import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesFilters.module.scss'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { Input } from '@/shared/ui/redesigned/Input'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleSortField, ArticleType } from '@/entities/Article'
import { SortOrder } from '@/shared/types/sort'
import { Icon } from '@/shared/ui/redesigned/Icon'
import SearchIcon from '@/shared/assets/icons/search.svg'

interface ArticlesFiltersProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  type: ArticleType
  search: string
  onChangeSearch: (value: string) => void
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
  onChangeType: (type: ArticleType) => void
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo((props) => {
  const { className, type, search, onChangeType, onChangeOrder, onChangeSort, order, sort, onChangeSearch } = props
  const { t } = useTranslation('article')
  return (
    <Card padding='24' className={classNames(cls.ArticlesFilters, {}, [className])}>
      <VStack gap='32'>
        <Input
          addonLeft={<Icon Svg={SearchIcon} />}
          placeholder={t('Поиск')}
          size='s'
          value={search}
          onChange={onChangeSearch}
        />
        <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
        <ArticleSortSelector sort={sort} order={order} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
      </VStack>
    </Card>
  )
})
