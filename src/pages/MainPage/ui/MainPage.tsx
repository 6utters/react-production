import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/ui/Page'
import { HStack } from 'shared/ui/Stack'
import { ListBox } from 'shared/ui/ListBox/ListBox'

const MainPage: FC = () => {
  const { t } = useTranslation('main')

  return (
    <Page>
      {t('Главная страница')}
      <HStack>
        <div>dasdas</div>
        <ListBox
          defaultValue="Choose Item"
          value={undefined}
          onChange={(value: string) => {}}
          items={[
            { value: '1', content: 'content 1' },
            { value: '2', content: 'content 2', disabled: true },
            { value: '3', content: 'content 3' }
          ]}
        />
      </HStack>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
      <div>dasdas</div>
    </Page>
  )
}

export default memo(MainPage)
