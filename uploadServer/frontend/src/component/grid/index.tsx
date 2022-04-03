import React, { FC } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'

import { RootState, Dispatch } from 'src/reducer/type'
import FilterBar from 'src/component/filterBar'
import { langSet } from 'src/reducer/language/type'
import { useTheme } from '@mui/material/styles'

export interface GridProps {
    rows: readonly {
        [key: string]: any
    }[]
    columns: GridColumns
    quickFilter?: boolean
}

const Grid: FC<GridProps> = props => {
    const { rows, columns, quickFilter } = props
    const { lang } = useSelector((state: RootState) => state.language)
    const theme = useTheme()

    const localText = lang === langSet.zh ? zhCN : enUS
    const setSearchText = () => {}

    const toolbarColor = theme.palette.primary.dark

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <FilterBar
                inputProps={{
                    placeholder: 'Filter any column...',
                }}
                handleChange={setSearchText}
            />

            <DataGrid
                sx={{
                    border: 0,
                }}
                density="compact"
                rows={rows}
                columns={columns}
                localeText={
                    localText.components.MuiDataGrid.defaultProps.localeText
                }
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'LastMountTime', sort: 'desc' }],
                    },
                    filter: {
                        filterModel: {
                            items: [
                                {
                                    columnField: 'mountStatus',
                                    operatorValue: 'is',
                                    value: '已挂载',
                                },
                            ],
                        },
                    },
                }}
                components={{
                    Toolbar: () => (
                        <GridToolbarContainer>
                            {/*  eslint-disable-next-line  */}
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
                /* eslint-enable */
            />
        </Box>
    )
}

export default Grid
