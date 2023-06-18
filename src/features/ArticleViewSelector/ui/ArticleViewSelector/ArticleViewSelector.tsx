import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TileIcon from '@/shared/assets/icons/tile-24-24.svg'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon } from '@/shared/ui/deprecated/Icon'
import cls from './ArticleViewSelector.module.scss'
import { ArticleView } from '@/entities/Article'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TileIcon
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon
  }
]

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo((props) => {
  const { view, onViewClick, className } = props
  const { t } = useTranslation()

  const onClick = (newView: ArticleView) => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ButtonTheme.CLEAR} key={viewType.view} onClick={() => onClick(viewType.view)}>
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={classNames('', {
              [cls.not_selected]: viewType.view !== view
            })}
          />
        </Button>
      ))}
    </div>
  )
})
