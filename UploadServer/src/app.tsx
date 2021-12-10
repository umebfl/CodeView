import { FC } from 'react'

import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import DefaultTheme from 'src/theme'
import Router from 'src/router'
import { store } from 'src/reducer/store'

import SnackbarContainer from 'src/component/snackbar'
import './app.css'

export const Context: FC = ({ children }) => (
    <Provider store={store}>
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
