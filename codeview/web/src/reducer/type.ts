import { RematchDispatch, RematchRootState } from '@rematch/core'

import { RootModel } from '.'
import { store } from './store'

export type StoreType = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
