/** No need unit test */
import { init } from '@rematch/core'

import { models } from 'src/reducer'

export const store = init({
    models,
})

export const getInitStore = () =>
    init({
        models,
    })
