import {
  ChangeEvent, useMemo
} from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
    value: T
    content: string
}

interface SelectProps<T extends string> {
    className?: string
    readonly?: boolean
    label?: string
    options?: SelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className, label, options, value, onChange, readonly
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
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
}
