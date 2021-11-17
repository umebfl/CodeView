import { createContext } from 'react'
import source from './source'

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
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
}


export const Context = createContext({})

export default reducer
