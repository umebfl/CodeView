import source from 'src/reducer/source'
import program from 'src/reducer/program'
import graphLayout from 'src/reducer/graphLayout'
import { stateLog } from 'src/util/loger'

export const initialState = {
    ...source.initialState,
    ...program.initialState,
    ...graphLayout.initialState,
}

const rootReducer = {
    ...source.reducer,
    ...program.reducer,
    ...graphLayout.reducer,
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
