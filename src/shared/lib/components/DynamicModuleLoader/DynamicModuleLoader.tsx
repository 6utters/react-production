import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager, StateSchema } from '@/app/providers/StoreProvider'
import { StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema'

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
    children: ReactNode
    reducers: ReducerList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducers, removeAfterUnmount = true
  } = props

  const dispatch = useDispatch()
  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap()
    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers[reducerName as StateSchemaKey]
      if (!mounted) {
        store.reducerManager.add(reducerName as StateSchemaKey, reducer)
        dispatch({ type: `@INIT ${reducerName} reducer` })
      }
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([reducerName]) => {
          store.reducerManager.remove(reducerName as StateSchemaKey)
          dispatch({ type: `@DESTROY ${reducerName} reducer` })
        })
      }
    }
    // eslint-disable-next-line
    }, [])

  return (
    <>
      {children}
    </>
  )
}
