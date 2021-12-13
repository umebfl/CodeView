/** No need unit test */
import { init } from '@rematch/core'

import { models } from 'src/reducer'

export const getInitStore = () =>
    init({
        models,
    })

export const store = getInitStore()
