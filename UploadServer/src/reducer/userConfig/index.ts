import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { ViewType } from 'src/module/uploadServer/detail/type'
import { userConfigType } from 'src/reducer/userConfig/type'

const initState: userConfigType = {
    uploadServer: {
        viewType: ViewType.list,
    },
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: userConfigType) => {
            return payload
        },
    },
})
