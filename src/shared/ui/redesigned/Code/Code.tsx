import { FC, memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import CopyIconNew from '@/shared/assets/icons/copy.svg'
import { Button as ButtonDeprecated, ButtonTheme } from '../../deprecated/Button/Button'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '../Icon'
import cls from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

export const Code: FC<CodeProps> = memo((props) => {
  const { className, text } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon Svg={CopyIconNew} clickable onClick={onCopy} className={cls.copy_btn} />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <ButtonDeprecated onClick={onCopy} className={cls.copy_btn} theme={ButtonTheme.CLEAR}>
            <CopyIcon className={cls.copy_icon} />
          </ButtonDeprecated>
          <code>{text}</code>
        </pre>
      }
    />
  )
})
