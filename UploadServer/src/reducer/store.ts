import { init } from '@rematch/core'

import { models } from 'src/reducer'

export const store = init({
    models,
})
