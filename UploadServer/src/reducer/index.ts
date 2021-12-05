import { Models } from '@rematch/core'

import { uploadServer } from './uploadServer'

export interface RootModel extends Models<RootModel> {
    uploadServer: typeof uploadServer
}

export const models: RootModel = { uploadServer }
