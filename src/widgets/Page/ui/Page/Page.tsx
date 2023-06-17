import { FC, memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { pageActions } from '../../model/slice/pageSlice'
import { getScrollByPath } from '../../model/selectors/getScrollByPath/getScrollByPath'
import { TestProps } from '@/shared/types/tests'
import cls from './Page.module.scss'

interface PageProps extends TestProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const PAGE_ID = 'PAGE_ID'

export const Page: FC<PageProps> = memo((props) => {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollByPath(state, pathname)
  )

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      pageActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname
      })
    )
  }, 500)

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
    </main>
  )
})
