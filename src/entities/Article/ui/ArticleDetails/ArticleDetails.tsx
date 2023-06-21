import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import { getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData'
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError'
import cls from './ArticleDetails.module.scss'
import { renderArticleBlock } from './renderBlock'
import { ToggleFeatures } from '@/shared/lib/features'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface ArticleDetailsProps {
  className?: string
  id?: string
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer
}

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData)

  return (
    <>
      <HStack justify='center' max className={cls.avatar_wrapper}>
        <AvatarDeprecated size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap='4' max data-testid='ArticleDetails.Info'>
        <TextDeprecated className={cls.title} size={TextSize.L} title={article?.title} text={article?.subtitle} />
        <HStack gap='8' className={cls.article_info}>
          <IconDeprecated className={cls.icon} Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap='8'>
          <IconDeprecated className={cls.icon} Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  )
}

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData)

  return (
    <>
      <Text bold size='l' title={article?.title} />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width='100%' height={420} border='16px' />}
        className={cls.img}
        src={article?.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  )
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo((props) => {
  const { className, id } = props
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)

  useInitialEffect(() => dispatch(fetchArticleById(id)))

  let content

  if (isLoading) {
    content = (
      <>
        <SkeletonDeprecated className={cls.avatar} width={200} height={200} border='50%' />
        <SkeletonDeprecated className={cls.title} width={300} height={32} />
        <SkeletonDeprecated className={cls.skeleton} width='100%' height={200} />
        <SkeletonDeprecated className={cls.skeleton} width='100%' height={200} />
      </>
    )
  } else if (error) {
    content = <TextDeprecated title={t('Произошла ошибка при загрузке статьи')} align={TextAlign.CENTER} />
  } else {
    content = <ToggleFeatures feature='isAppRedesigned' on={<Redesigned />} off={<Deprecated />} />
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack gap='16' max className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  )
})
