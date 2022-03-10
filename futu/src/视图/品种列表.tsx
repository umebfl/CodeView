import React, { useEffect, useState } from 'react'
import Box from '@mui/system/Box'

import { AgGridReact } from 'ag-grid-react'
import { RowClassParams, ValueFormatterParams } from 'ag-grid-enterprise'

import 数据流程, {
    type_基础品种信息_二级,
} from 'src/数据流/2级数据处理/流程/2级数据流程'

import 三级数据流程 from 'src/数据流/3级数据处理/流程/3级数据流程'
import { type_基础品种信息_三级 } from 'src/数据流/type'
import { filter } from 'ramda'

const 品种列表 = () => {
    const [rowData, setRowData] = useState<type_基础品种信息_二级[]>([])

    const [columnDefs] = useState([
        {
            headerName: '基础',
            children: [
                {
                    field: '序号',
                    width: 140,
                    // columnGroupShow: 'open',
                    cellRenderer: (params: any) => {
                        return params.rowIndex + 1
                    },
                },
                {
                    field: 'Code',
                    width: 140,
                    // columnGroupShow: 'open',
                    cellRenderer: (params: any) => {
                        const { data } = params as {
                            data: type_基础品种信息_二级
                        }

                        return `${data.Code} / ${data.name}`
                    },
                },
                // {
                //     field: '合格状态',
                //     sortable: true,
                //     width: 140,
                //     cellRenderer: (params: any) => {
                //         const { data } = params as {
                //             data: type_基础品种信息_二级
                //         }

                //         return data.合格状态 ? '合格' : '不合格'
                //     },
                // },
                // {
                //     field: '不合格原因',
                //     width: 240,
                // },
                {
                    field: 'rate',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '最新主力价格',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '一手保证金金额',
                    sortable: true,
                    width: 140,
                    cellRenderer: (params: ValueFormatterParams) => {
                        return params.value ? params.value?.toFixed(0) : '-'
                    },
                },
            ],
        },
    ])

    useEffect(() => {
        const { 品种列表 } = 数据流程()
        setRowData(品种列表)
    }, [])

    const flush = async () => {
        const rv = await 三级数据流程()
        const { 品种列表 } = rv
        console.log('三级数据流程', rv)

        const 合格品种列表 = filter(
            (品种: type_基础品种信息_三级) => 品种.合格状态
        )(品种列表)
        setRowData(合格品种列表)
    }

    useEffect(() => {
        flush()
    }, [])

    return (
        <Box
            className="ag-theme-alpine"
            sx={{ height: '90vh', width: '96%', margin: '20px 2%' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                getRowStyle={(params: RowClassParams) => {
                    return params.rowIndex % 2
                        ? { backgroundColor: '#EEE' }
                        : { backgroundColor: 'white' }
                }}
            ></AgGridReact>
        </Box>
    )
}

export default 品种列表
