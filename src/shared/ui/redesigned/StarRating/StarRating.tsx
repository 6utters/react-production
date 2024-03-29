import { FC, memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/star.svg'
import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '../Icon'
import cls from './StarRating.module.scss'

interface StarRatingProps {
  className?: string
  onSelect?: (starCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating: FC<StarRatingProps> = memo((props) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount)
    }
  }

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0)
    }
  }

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setCurrentStarsCount(starsCount)
      setIsSelected(true)
    }
  }

  return (
    <div
      className={classNames(
        toggleFeatures({ name: 'isAppRedesigned', on: () => cls.StarRatingRedesigned, off: () => cls.StarRating }),
        {},
        [className]
      )}
    >
      {stars.map((starNum) => {
        const commonProps = {
          className: classNames(
            cls.starIcon,
            {
              [cls.hovered]: currentStarsCount >= starNum,
              [cls.normal]: currentStarsCount < starNum,
              [cls.selected]: isSelected
            },
            []
          ),
          Svg: StarIcon,
          key: starNum,
          height: size,
          width: size,
          onMouseEnter: onHover(starNum),
          onMouseLeave: onLeave,
          onClick: onClick(starNum),
          'data-testid': `StarRating.${starNum}`,
          'data-selected': currentStarsCount >= starNum
        }
        return (
          <ToggleFeatures
            feature='isAppRedesigned'
            on={<Icon clickable {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
          />
        )
      })}
    </div>
  )
})
