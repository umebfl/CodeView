
const initialState = {
    source: {
        fileMap: null,
    },
}

const reducer = {
    'source/setFileMap': (state, payload) => {
        return {
            ...state,
            source: {
                ...state.source,
                fileMap: payload,
            },
        }
    }
}

const source = {
    initialState,
    reducer,
}

export default source