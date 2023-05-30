import {
  FC, memo, ReactNode, useCallback
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import CopyIcon from 'shared/assets/icons/copy-20-20.svg'
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
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button onClick={onCopy} className={cls.copy_btn} theme={ButtonTheme.CLEAR}>
        <CopyIcon className={cls.copy_icon} />
      </Button>
      <code>
        {text}
      </code>
    </pre>
  )
})
