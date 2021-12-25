/** No need unit test */
import { Models } from '@rematch/core'

import { userConfig } from 'src/reducer/userConfig'
import { snackbar } from 'src/reducer/snackbar'
import { source } from 'src/reducer/source'

export interface RootModel extends Models<RootModel> {
    userConfig: typeof userConfig
    snackbar: typeof snackbar
    source: typeof source
}

export const models: RootModel = {
    userConfig,
    snackbar,
    source,
}
