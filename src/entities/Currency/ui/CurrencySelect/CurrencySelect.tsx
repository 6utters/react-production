import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Currency } from '../../model/types/currency'

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
    readonly?: boolean
}

const options: SelectOption<Currency>[] = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.BYN, content: Currency.BYN },
  { value: Currency.RUB, content: Currency.RUB }
]

export const CurrencySelect: FC<CurrencySelectProps> = memo(({
  className, onChange, value, readonly
}) => {
  const { t } = useTranslation('profile')

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <ListBox
      readonly={readonly}
      defaultValue={t('Валюта')}
      label={t('Валюта')}
      items={options}
      value={value}
      onChange={onChangeHandler}
      direction="top right"
    />
  )
})
