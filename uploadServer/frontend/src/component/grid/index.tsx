import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import {
    DataGrid,
    GridColumns,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    zhCN,
    enUS,
} from '@mui/x-data-grid'
import { useSelector } from 'react-redux'

import { RootState } from 'src/reducer/type'
import { langSet } from 'src/reducer/language/type'
import { useTheme } from '@mui/material/styles'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import Toolbar from 'src/component/grid/toolbar'
import { contains, filter } from 'ramda'
import { GridValueGetterParams } from '@mui/x-data-grid'

export interface Grid_Rows_Columns {
    rows: readonly {
        [key: string]: any
    }[]
    columns: GridColumns
}

export interface GridProps extends Grid_Rows_Columns {
    quickFilter?: boolean
    initialState?: GridInitialStateCommunity
    toolbarRight?: React.FC
    saveGridConfig?: (state: GridInitialStateCommunity) => void
    dataGridProps?: any
}

export interface filterRowsProps extends Grid_Rows_Columns {
    quickFilterText: string
}

const filterRows = (payload: filterRowsProps) => {
    const { rows, columns, quickFilterText } = payload

    if (quickFilterText.length === 0) {
        return rows
    }

    const data = filter((item: any) => {
        let rv = false

        for (let i = 0; i < columns.length; i++) {
            const col = columns[i]
            let val = ''

            if (col.valueGetter) {
                val = col?.valueGetter({
                    row: item,
                } as GridValueGetterParams) as string
            } else {
                val = item[col.field]
            }

            if (contains(quickFilterText)(val || '')) {
                rv = true
                break
            }
        }

        return rv
    })(rows)

    return data
}

const Grid: FC<GridProps> = props => {
    const {
        rows,
        columns,
        quickFilter,
        toolbarRight,
        initialState,
        saveGridConfig,
        dataGridProps,
    } = props
    const { lang } = useSelector((state: RootState) => state.language)
    const theme = useTheme()

    const [quickFilterText, setQuickFilterText] = useState('')

    const localText = lang === langSet.zh ? zhCN : enUS

    const toolbarColor = theme.palette.primary.dark

    const data = quickFilter
        ? filterRows({ rows, columns, quickFilterText })
        : rows

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Toolbar
                quickFilterProps={{
                    open: quickFilter,
                    value: quickFilterText,
                    handleChange: setQuickFilterText,
                }}
                ToolbarRight={toolbarRight}
            />

            <DataGrid
                sx={{
                    border: 0,
                }}
                // onStateChange={(state: any, details: any) => {
                //     console.log(state, details)
                // }}
                onColumnVisibilityModelChange={model => {
                    if (saveGridConfig) {
                        saveGridConfig({
                            columns: {
                                columnVisibilityModel: model,
                            },
                        })
                    }
                }}
                density="compact"
                rows={data}
                columns={columns}
                localeText={
                    localText.components.MuiDataGrid.defaultProps.localeText
                }
                initialState={{
                    pagination: {
                        pageSize: 25,
                    },

                    ...initialState,
                }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                components={{
                    Toolbar: () => (
                        <GridToolbarContainer>
                            <GridToolbarColumnsButton
                                sx={{ color: toolbarColor }}
                            />
                            <GridToolbarFilterButton
                                sx={{ color: toolbarColor }}
                            />
                            <GridToolbarDensitySelector
                                sx={{ color: toolbarColor }}
                            />
                            <GridToolbarExport
                                sx={{ color: toolbarColor }}
                                csvOptions={{
                                    utf8WithBom: true,
                                }}
                            />
                        </GridToolbarContainer>
                    ),
                }}
                {...dataGridProps}
            />
        </Box>
    )
}

export default Grid
