/** No need unit test */
import { Models } from '@rematch/core'

import { uploadServer } from 'src/reducer/uploadServer'
import { globalLoading } from 'src/reducer/globalLoading'
import { snackbar } from 'src/reducer/snackbar'

export interface RootModel extends Models<RootModel> {
    uploadServer: typeof uploadServer
    globalLoading: typeof globalLoading
    snackbar: typeof snackbar
}

export const models: RootModel = { uploadServer, globalLoading, snackbar }
