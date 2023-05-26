import { FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import { ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { Reducer } from '@reduxjs/toolkit'

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
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
    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      store.reducerManager.add(reducerName as StateSchemaKey, reducer)
      dispatch({ type: `@INIT ${reducerName} reducer` })
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
