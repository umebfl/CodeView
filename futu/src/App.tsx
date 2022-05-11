import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import './App.css';

// import Mode from 'src/view/mode'

import 视图 from 'src/视图/index'
import 品种列表 from 'src/视图/品种列表'
import 交易决策 from 'src/视图/交易决策'
// import 流程 from 'src/数据流/2级数据处理/流程/2级数据流程'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'

function App() {
    // useEffect(() => {
    //     const 数据 = 流程()
    //     console.log(数据)
    // }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<视图 />}>
                    <Route path="jiao_yi_jue_ce" element={<交易决策 />} />

                    <Route
                        path="ping_zhong_lie_biao"
                        element={<div>123</div>}
                    />
                    <Route path="*" element={<div>404</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
