import React, { useEffect, useState } from 'react'
import Box from '@mui/system/Box'

import { AgGridReact } from 'ag-grid-react'
import { RowClassParams, ValueFormatterParams } from 'ag-grid-enterprise'

// import 数据流程, {
//     type_基础品种信息_二级,
// } from 'src/数据流/2级数据处理/流程/2级数据流程'

// import 数据流程 from 'src/数据流/0级数据处理/流程/零级数据流程'
import { type_基础品种信息, 类型_请求结果 } from 'src/类型'

// import 三级数据流程 from 'src/数据流/3级数据处理/流程/3级数据流程'
// import { type_基础品种信息_三级 } from 'src/数据流/type'
// import { filter } from 'ramda'

const 品种列表 = () => {
    const [rowData, setRowData] = useState<type_基础品种信息[]>([])

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
                    field: '代码',
                    width: 140,
                    // columnGroupShow: 'open',
                    // cellRenderer: (params: any) => {
                    //     const { data } = params as {
                    //         data: type_基础品种信息_二级
                    //     }

                    //     return `${data.Code} / ${data.name}`
                    // },
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
                {
                    field: '名称',
                    width: 240,
                },
                {
                    field: '保证金比例',
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

    const 获取全品种列表 = async () => {
        try {
            const 请求 = await fetch('/quan_ping_zhong_lie_biao')
            const 结果 = (await 请求.json()) as 类型_请求结果

            if (!结果.状态) {
                throw new Error('获取全品种列表失败！')
            }

            console.log('全品种列表', 结果.数据)
            return 结果.数据
        } catch (error) {
            alert(error)
        }
    }

    const 获取指定品种的连续合约日数据 = async () => {
        try {
            const 请求 = await fetch(`/gen_xin_lian_xu_ri_shu_ju/TA`)
            const 结果 = (await 请求.json()) as 类型_请求结果

            if (!结果.状态) {
                throw new Error('获取指定品种的连续合约日数据失败！')
            }

            console.log('指定品种的连续合约日数据', 结果.数据)
            return 结果.数据
        } catch (error) {
            alert(error)
        }
    }

    const 设置列表_全品种列表 = async () => {
        const 全品种列表 = await 获取全品种列表()
        setRowData(全品种列表)

        const 日数据 = await 获取指定品种的连续合约日数据()
    }

    useEffect(() => {
        设置列表_全品种列表()
    }, [])

    // const flush = async () => {
    //     const rv = await 三级数据流程()
    //     const { 品种列表 } = rv
    //     // console.log('三级数据流程', rv)

    //     const 合格品种列表 = filter(
    //         (品种: type_基础品种信息_三级) => 品种.合格状态
    //     )(品种列表)
    //     setRowData(合格品种列表)
    // }

    // useEffect(() => {
    //     flush()
    // }, [])

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
