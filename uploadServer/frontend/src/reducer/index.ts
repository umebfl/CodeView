/** No need unit test */
import { Models } from '@rematch/core'

import { uploadServer } from 'src/reducer/uploadServer'
import { globalLoading } from 'src/reducer/globalLoading'
import { snackbar } from 'src/reducer/snackbar'
import { userConfig } from 'src/reducer/userConfig'
import { language } from 'src/reducer/language'

export interface RootModel extends Models<RootModel> {
    uploadServer: typeof uploadServer
    globalLoading: typeof globalLoading
    snackbar: typeof snackbar
    userConfig: typeof userConfig
    language: typeof language
}

export const models: RootModel = {
    uploadServer,
    globalLoading,
    snackbar,
    userConfig,
    language,
}
