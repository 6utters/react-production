import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const MainPage: FC = memo(() => {
  const { t } = useTranslation('main')
  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    setValue(value)
  }

  return (
    <div>
      {t('Главная страница')}
    </div>
  )
})

export default MainPage
