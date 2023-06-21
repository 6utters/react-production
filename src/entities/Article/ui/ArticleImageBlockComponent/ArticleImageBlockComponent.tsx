import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { ArticleImageBlock } from '../../model/types/article'
import { ToggleFeatures } from '@/shared/lib/features'
import cls from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo((props) => {
  const { className, block } = props
  return (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={block.title} align='center' />}
          off={<TextDeprecated title={block.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  )
})
