import React, { useEffect } from 'react'
// import './App.css';

// import Mode from 'src/view/mode'

import 品种列表 from 'src/视图/品种列表'
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
        <div className="App">
            <品种列表 />
            {/* <Mode /> */}
        </div>
    )
}

export default App
