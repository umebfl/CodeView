import uploadServer from 'src/reducer/uploadServer'
import { stateLog } from 'src/util/loger'

export const initialState = {
    ...uploadServer.initState,
}

const rootReducer: Record<string, Function> = {
    ...uploadServer.reducer,
}

const reducer = (state: any, action: { type: string; payload: any }) => {
    const fn = rootReducer[action.type]

    if (!fn) {
        throw new Error('action type no found!')
    }

    const nextState = fn(state, action.payload)

    stateLog(state, nextState, action)

    return nextState
}

export default reducer
