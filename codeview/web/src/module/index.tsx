import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'src/module/index.css'

import Homepage from 'src/module/homepage'
import Workspace from 'src/module/workspace'

const Module = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}>
                    <Route index element={<Workspace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Module
