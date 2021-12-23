import React, { FC } from 'react'

import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import DefaultTheme from 'src/theme'
import { store } from 'src/reducer/store'
import { StoreType } from 'src/reducer/type'

import Module from 'src/module'

interface ContextType {
    children: any
    initStore?: StoreType
}

export const Context = ({ children, initStore }: ContextType) => (
    <Provider store={initStore || store}>
        <ThemeProvider theme={DefaultTheme}>{children}</ThemeProvider>
    </Provider>
)

export default () => {
    return (
        <Context>
            <Module />
        </Context>
    )
}
