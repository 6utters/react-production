import { FC, Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DropdownDirection } from 'shared/types/ui'
import { HStack } from '../Stack/HStack/HStack'
import { Button } from '../Button/Button'
import cls from './ListBox.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

const madDirectionClass: Record<DropdownDirection, string> = {
  'top left': cls.option_top_left,
  'top right': cls.option_top_right,
  'bottom left': cls.option_bottom_left,
  'bottom right': cls.option_bottom_right
}

export const ListBox: FC<ListBoxProps> = (props) => {
  const {
    className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label
  } = props

  const additionalClasses = [madDirectionClass[direction]]

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, additionalClasses)}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
