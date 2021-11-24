import source from 'src/reducer/source'
import program from 'src/reducer/program'
import { stateLog } from 'src/util/loger'

export const initialState = {
    ...source.initialState,
    ...program.initialState,
}

const rootReducer = {
    ...source.reducer,
    ...program.reducer,
}

const reducer = (state, action) => {
    const fun = rootReducer[action.type]

    if (!fun) {
        throw new Error()
    }

    const nextState = fun(state, action.payload)

    stateLog(state, nextState, action)

    return nextState
}

export default reducer
