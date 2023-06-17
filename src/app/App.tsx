import { FC, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserInited, useJsonSettingsByKey, userActions } from '@/entities/User'

export const App: FC = () => {
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)
  const themeFromSettings = useJsonSettingsByKey('theme')
  const isFirstVisit = useJsonSettingsByKey('isFirstVisit')

  console.log('themeFromSettings:', themeFromSettings)
  console.log('isFirstVisit:', isFirstVisit)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}
