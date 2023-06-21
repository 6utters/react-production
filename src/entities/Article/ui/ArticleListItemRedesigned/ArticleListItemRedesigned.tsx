import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleListItemProps } from '../ArticleListItem/ArticleListItem'
import { Text } from '@/shared/ui/redesigned/Text'
import { Icon } from '@/shared/ui/redesigned/Icon'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts'
import { ArticleTextBlock } from '../../model/types/article'
import { Card } from '@/shared/ui/redesigned/Card'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleDetails } from '@/shared/const/router'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import cls from './ArticleListItemRedesigned.module.scss'

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = memo((props) => {
  const { className, article, view, target } = props
  const { t } = useTranslation('article')

  const userInfo = (
    <>
      <Avatar size={43} src={article.user.avatar} />
      <Text bold text={article.user.username} />
    </>
  )

  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
    return (
      <Card
        padding='24'
        max
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        data-testid='ArticleListItem'
      >
        <VStack gap='16' max>
          <HStack gap='8' max>
            <Avatar size={32} src={article.user.avatar} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size='s' bold />
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text className={cls.text_block} text={textBlock.paragraphs.slice(0, 2).join(' ')} />
          )}
          <HStack max justify='between'>
            <AppLink to={getRouteArticleDetails(article.id)}>
              <Button variant='outline'>{t('Читать далее')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    )
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      data-testid='ArticleListItem'
    >
      <Card className={cls.card} border='rounded'>
        <AppImage
          fallback={<Skeleton width={200} height={200} />}
          src={article.img}
          alt={article.title}
          className={cls.img}
        />
        <VStack className={cls.info} gap='4'>
          <Text text={article.title} className={cls.title} />
          <VStack gap='4' className={cls.footer} max>
            <HStack justify='between' max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  )
})
