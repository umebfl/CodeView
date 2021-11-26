import { useReducer } from 'react'

import Home from 'src/home'

import reducer, { initialState } from 'src/reducer'

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Home state={state} dispatch={dispatch} />
}

export default App
