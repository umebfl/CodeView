import { useReducer } from 'react'

import Home from 'src/home'

import reducer, { initialState } from 'src/reducer'
import { viewInterceptor } from 'src/util/interceptor'

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Home state={state} dispatch={dispatch} />
}

export default viewInterceptor(App)
