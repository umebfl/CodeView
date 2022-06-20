/** No need unit test */
import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import AsyncStorage from '@react-native-community/async-storage'

import { models, RootModel } from 'src/reducer'

const persistPlugin = createRematchPersist<RootModel, any>({
    key: 'autox',
    storage: AsyncStorage,
    whitelist: ['userConfig', 'language'],
    throttle: 1000,
    debug: false,
    version: 6,
})

export const getInitStore = () =>
    init({
        models,
        plugins: [persistPlugin],
    })

export const store = getInitStore()
