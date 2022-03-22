import React, { FC } from 'react'

import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import DefaultTheme from 'src/theme'
import Router from 'src/module'
import { store } from 'src/reducer/store'

import SnackbarContainer from 'src/component/snackbar'
import { Store } from 'src/reducer/type'

import './app.css'

interface ContextType {
    children: any
    initStore?: Store
}

export const Context = ({ children, initStore }: ContextType) => (
    <Provider store={initStore || store}>
        <ThemeProvider theme={DefaultTheme}>
            {children}
            <SnackbarContainer />
        </ThemeProvider>
    </Provider>
)

const App: FC = () => {
    return (
        <Context>
            <Router />
        </Context>
    )
}

export default App
