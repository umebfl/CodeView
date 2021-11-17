import source from 'src/reducer/source'
import { stateLog } from "src/util/loger";

export const initialState = {
    ...source.initialState,
};

const rootReducer = {
    ...source.reducer,
}

const reducer = (state, action) => {

    const fun = rootReducer[action.type]

    if(!fun) {
        throw new Error();
    }

    const nextState = fun(state, action.payload)

    stateLog(state, nextState, action);

    return nextState
}

export default reducer
