import { useEffect, useState, useMemo, useReducer } from 'react'
import GridLayout from 'react-grid-layout'

import 'src/App.css'
import 'node_modules/react-grid-layout/css/styles.css'
import 'node_modules/react-resizable/css/styles.css'

import ProList from 'src/view/proList'
import Parse from 'src/view/parse'
import Program from 'src/view/program'

import { viewInterceptor } from 'src/util/interceptor'

import reducer, { initialState } from 'src/reducer'

const DEFAULT_LAYOUT = [
    { i: 'proList', x: 0, y: 0, w: 2, h: 10, minW: 1, maxW: 100 },
    { i: 'main', x: 0, y: 0, w: 7, h: 10, minW: 1, maxW: 100 },
    { i: 'test', x: 0, y: 0, w: 7, h: 10, minW: 1, maxW: 100 },
]

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [layout, setLayout] = useState(DEFAULT_LAYOUT)

    const handleChange = e => {
        const data = e.map(item => ({ ...item, static: true }))
        localStorage.setItem('layout', JSON.stringify(data))
    }

    useEffect(() => {
        const layoutCache = JSON.parse(localStorage.getItem('layout'))
        setLayout(layoutCache)
    }, [])

    const ProListCmp = useMemo(() => <ProList dispatch={dispatch} />, [])

    const ParseCmp = useMemo(
        () => <Parse data={state.source.fileMap} dispatch={dispatch} />,
        [state.source.fileMap]
    )

    const ProgramCmp = useMemo(
        () => <Program data={state.program.data} />,
        [state.program.data]
    )

    return (
        <div style={{ width: '100%' }}>
            <GridLayout
                className="layout"
                layout={layout}
                rowHeight={50}
                width={1800}
                onDragStop={handleChange}
                onResize={handleChange}
            >
                <div key="proList">{ProListCmp}</div>
                <div key="main">{ParseCmp}</div>
                <div key="program">{ProgramCmp}</div>
            </GridLayout>
        </div>
    )
}

export default viewInterceptor(App)
