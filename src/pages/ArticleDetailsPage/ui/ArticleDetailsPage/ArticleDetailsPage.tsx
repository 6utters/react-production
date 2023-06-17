import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleDetails } from '@/entities/Article'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleRating } from '@/features/ArticleRating'
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return null
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap='16' max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRating articleId={id} />
          <ArticleRecommendationsList />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
