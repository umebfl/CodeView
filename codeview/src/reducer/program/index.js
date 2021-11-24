const initialState = {
    program: {
        data: [],
    },
}

const reducer = {
    'program/setData': (state, payload) => {
        return {
            ...state,
            program: {
                ...state.program,
                data: payload,
            },
        }
    },
}

const program = {
    initialState,
    reducer,
}

export default program
