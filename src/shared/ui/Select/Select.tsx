import {
  ChangeEvent, FC, memo, useMemo
} from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    readonly?: boolean
    label?: string
    options?: SelectOption[]
    value?: string
    onChange?: (value: string) => void
}

export const Select: FC<SelectProps> = memo((props) => {
  const {
    className, label, options, value, onChange, readonly
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  const oprionList = useMemo(() => options?.map((opt) => (
    <option
      className={cls.option}
      value={opt.value}
      key={opt.value}
    >
      {opt.content}
    </option>
  )), [options])

  const mods: Mods = {}

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {oprionList}
      </select>
    </div>
  )
})
