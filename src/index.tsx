import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { App } from './app/App'
import '@/shared/config/i18n/i18n'
import '@/app/styles/index.scss'
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate'

const container = document.getElementById('root')

if (!container) {
  throw new Error("Container root hasn't been found")
}
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
export { Theme } from '@/shared/const/theme'
