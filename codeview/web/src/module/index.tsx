import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Workspace from 'src/module/workspace'

import 'src/module/index.css'

const Module = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Workspace />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Module
