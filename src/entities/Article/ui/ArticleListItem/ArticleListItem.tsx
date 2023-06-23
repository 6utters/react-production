import { FC, HTMLAttributeAnchorTarget, memo } from 'react'
import { ArticleView } from '../../model/consts/articleConsts'
import { Article } from '../../model/types/article'
import { ToggleFeatures } from '@/shared/lib/features'
import { ArticleListItemDeprecated } from '../ArticleListItemDeprecated/ArticleListItemDeprecated'
import { ArticleListItemRedesigned } from '../ArticleListItemRedesigned/ArticleListItemRedesigned'

export interface ArticleListItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => (
  <ToggleFeatures
    feature='isAppRedesigned'
    on={<ArticleListItemRedesigned {...props} />}
    off={<ArticleListItemDeprecated {...props} />}
  />
))
