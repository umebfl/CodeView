import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import DefaultTheme from 'src/theme'
import Router from 'src/router'
import { store } from 'src/reducer/store'

import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={DefaultTheme}>
                <Router />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// import reportWebVitals from "./reportWebVitals";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
