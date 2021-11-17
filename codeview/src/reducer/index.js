import source from 'src/reducer/source'

export const initialState = {
    source: source.initialState,
};

const reducer = (state, action) => {
    console.log(source, action);
    const reducerMap = {
        ...source.reducer,
    }

    const fun = reducerMap[action.type]

    if(!fun) {
        throw new Error();
    }

    return fun(state, action.payload)
}

export default reducer
