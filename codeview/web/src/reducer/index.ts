/** No need unit test */
import { Models } from '@rematch/core'

import { userConfig } from 'src/reducer/userConfig'

export interface RootModel extends Models<RootModel> {
    userConfig: typeof userConfig
}

export const models: RootModel = {
    userConfig,
}
