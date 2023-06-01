import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleView } from 'entities/Article'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import TileIcon from 'shared/assets/icons/tile-24-24.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import cls from './ArticleViewSelect.module.scss'

interface ArticleViewSelectProps {
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

export const ArticleViewSelect: FC<ArticleViewSelectProps> = memo((props) => {
  const { view, onViewClick, className } = props
  const { t } = useTranslation()

  const onClick = (newView: ArticleView) => {
    onViewClick?.(newView)
  }

  return (
    <div className={classNames('', {}, [className])}>
      {
        viewTypes.map((viewType) => (
          <Button
            theme={ButtonTheme.CLEAR}
            key={viewType.view}
            onClick={() => onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames('', { [cls.not_selected]: viewType.view !== view })}
            />
          </Button>
        ))
      }
    </div>
  )
})
