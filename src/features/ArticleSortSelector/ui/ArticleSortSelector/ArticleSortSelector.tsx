import { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Select, SelectOption } from '@/shared/ui/deprecated/Select'
import { SortOrder } from '@/shared/types/sort'
import { ArticleSortField } from '@/entities/Article'
import cls from './ArticleSortSelector.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeOrder: (newOrder: SortOrder) => void
  onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo((props) => {
  const { className, sort, onChangeSort, order, onChangeOrder } = props
  const { t } = useTranslation('article')

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('Возрастанию')
      },
      {
        value: 'desc',
        content: t('Убыванию')
      }
    ],
    [t]
  )

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('Дате создания')
      },
      {
        value: ArticleSortField.TITLE,
        content: t('Названию')
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('Количеству просмотров')
      }
    ],
    [t]
  )

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
          <VStack gap='8'>
            <Text text={t('Сортировать по')} />
            <ListBox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
            <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
          </VStack>
        </div>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <Select options={sortFieldOptions} label={t('Сортировать по')} value={sort} onChange={onChangeSort} />
          <Select options={orderOptions} label={t('По')} value={order} onChange={onChangeOrder} className={cls.order} />
        </div>
      }
    />
  )
})
