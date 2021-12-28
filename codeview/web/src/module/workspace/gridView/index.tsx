import { useRef } from 'react'
import { useSize } from 'ahooks'
import { map, max } from 'ramda'

import { useTheme } from '@mui/material/styles'
import Box from '@mui/system/Box'

import GridLayout, { ItemCallback } from 'react-grid-layout'

import 'src/module/workspace/gridView/react-resizable.css'
import 'src/module/workspace/gridView/react-grid-layout.css'
import 'src/module/workspace/gridView/react-grid-layout-fix.css'

import { Dispatch, RootState } from 'src/reducer/type'
import { useDispatch, useSelector } from 'react-redux'
import { optionSubNodeType } from 'src/reducer/userConfig/type'

import Config from 'src/module/workspace/gridView/module/config'
import MenuBar from 'src/module/workspace/gridView/module/menuBar'
import SourceTree from 'src/module/workspace/gridView/module/sourceTree'
import SourceCode from 'src/module/workspace/gridView/module/sourceCode'
import Graphin from 'src/module/workspace/gridView/module/graphin'
import Statistics from 'src/module/workspace/gridView/module/statistics'

const GridView = () => {
    const theme = useTheme()
    const ref = useRef()
    const size = useSize(ref)

    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()

    const { grid, option } = userConfig
    const width = max(size?.width || 1024, 1024)

    const handleChange: ItemCallback = layout => {
        dispatch.userConfig.set({
            ...userConfig,
            grid: {
                ...userConfig.grid,
                layout: layout,
            },
        })
    }

    const lock = (option['root/gird/lock'] as optionSubNodeType)
        .value as boolean

    const layout = map((item: GridLayout.Layout) => ({
        ...item,
        static: lock,
    }))(grid.layout)

    // console.log(JSON.stringify(layout, null, 2))

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: theme.palette.background.default,
                color: theme.palette.grey.A100,
            }}
        >
            <GridLayout
                layout={layout}
                cols={24}
                rowHeight={50}
                width={width}
                onDragStop={handleChange}
                onResize={handleChange}
            >
                <div key="menuBar">
                    <MenuBar />
                </div>
                <div key={'sourceTree'}>
                    <SourceTree />
                </div>
                <div key={'sourceCode'}>
                    <SourceCode />
                </div>
                <div key={'graphin'}>
                    <Graphin />
                </div>
                <div key={'statistics'}>
                    <Statistics />
                </div>
            </GridLayout>
        </Box>
    )
}

export default GridView
