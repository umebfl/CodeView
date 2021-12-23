import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { userConfigType } from 'src/reducer/userConfig/type'

const initState: userConfigType = {
    sourcePath: [],
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: userConfigType) => {
            return payload
        },
    },
})
