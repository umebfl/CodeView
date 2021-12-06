import { Models } from '@rematch/core'

import { uploadServer } from './uploadServer'
import { globalLoading } from './globalLoading'

export interface RootModel extends Models<RootModel> {
    uploadServer: typeof uploadServer
    globalLoading: typeof globalLoading
}

export const models: RootModel = { uploadServer, globalLoading }
