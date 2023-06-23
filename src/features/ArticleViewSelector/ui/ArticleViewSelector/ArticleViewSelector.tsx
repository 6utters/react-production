import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg'
import TileIconDeprecated from '@/shared/assets/icons/tile-24-24.svg'
import ListIcon from '@/shared/assets/icons/burger.svg'
import TileIcoN from '@/shared/assets/icons/tile.svg'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { ArticleView } from '@/entities/Article'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import cls from './ArticleViewSelector.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcoN,
      off: () => TileIconDeprecated
    })
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated
    })
  }
]

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo((props) => {
  const { view, onViewClick, className } = props

  const onClick = (newView: ArticleView) => {
    onViewClick?.(newView)
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card border='rounded' className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
          <HStack gap='8'>
            {viewTypes.map((viewType) => (
              <Icon
                clickable
                key={viewType.view}
                onClick={() => onClick(viewType.view)}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.not_selected]: viewType.view !== view
                })}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames('', {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated theme={ButtonTheme.CLEAR} key={viewType.view} onClick={() => onClick(viewType.view)}>
              <IconDeprecated
                width={24}
                height={24}
                key={viewType.view}
                Svg={viewType.icon}
                className={classNames(cls.ArticleViewSelector, {
                  [cls.not_selected]: viewType.view !== view
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  )
})
