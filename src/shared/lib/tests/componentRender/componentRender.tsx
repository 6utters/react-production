import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import i18nForTests from '../../../config/i18n/i18nForTests'

export interface componentRenderOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export function componentRender(Component: ReactNode, options: componentRenderOptions = {}) {
  const { route = '/', initialState } = options
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          {Component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>

  )
}
