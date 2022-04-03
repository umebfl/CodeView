import React, { useEffect, useState } from 'react'
import Box from '@mui/system/Box'

import { AgGridReact } from 'ag-grid-react'
import { RowClassParams, ValueFormatterParams } from 'ag-grid-enterprise'

import { Line } from '@antv/g2plot'

import { type_基础品种信息, 类型_请求结果 } from 'src/类型'
import {
    获取全品种列表,
    获取指定品种的连续合约日数据,
    获取最新品种数据,
} from 'src/数据/品种数据'
import { map, reduce, sort, takeLast } from 'ramda'

const CHART_WIDTH = 180
const CHART_HEIGHT = 80

const 渲染图表 = (
    品种: type_基础品种信息,
    数据: any,
    id: string,
    扩幅: number,
    关注阈值: number
) => {
    const 开盘价 = 数据[0].scales
    const 收盘价 = 数据[数据.length - 1].scales

    const 多空方向 = 开盘价 < 收盘价 ? '多' : '空'
    const 涨跌比例 = parseFloat((((收盘价 - 开盘价) / 开盘价) * 100).toFixed(2))

    const 排序 = sort((a: any, b: any) => {
        return a.scales - b.scales
    })(数据)

    const 最低价 = 排序[0].scales
    const 最高价 = 排序[排序.length - 1].scales

    const 振幅 = parseFloat((((最高价 - 最低价) / 最低价) * 100).toFixed(2))

    let 颜色 = 'grey'

    if (Math.abs(涨跌比例) > 关注阈值) {
        if (多空方向 === '多') {
            颜色 = '#b52d4c'
        } else {
            颜色 = '#376137'
        }
    } else {
        if (Math.abs(涨跌比例) > 1) {
            if (多空方向 === '多') {
                颜色 = 'rgba(224, 104,104, 0.8)'
            } else {
                颜色 = 'rgba(56, 153, 56, 0.9)'
            }
        }
    }

    const line = new Line(id, {
        data: 数据,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',

        color: 颜色,
        lineStyle: {
            // fill: 多空方向 === '多' ? 'red' : 'green',
        },

        xAxis: {
            // type: 'timeCat',
            tickCount: 4,
            grid: {
                line: {
                    style: {
                        lineWidth: 0,
                    },
                },
            },
            title: {
                //  | ${(
                //     振幅 - Math.abs(涨跌比例)
                // ).toFixed(2)}
                text: `${涨跌比例} | ${振幅}%`,
                position: 'center',
                spacing: 0,
                offset: -5,
                style: {
                    fontSize: Math.abs(涨跌比例) > 关注阈值 ? 16 : 11,
                    fontWeight: 'bold',
                    fill: 颜色,
                },
            },
        },

        yAxis: {
            label: null,
            tickCount: 5,
            nice: true,
            min: 最低价 * (1 - 扩幅 / 2),
            max: 最高价 * (1 + 扩幅 / 2),
            tickLine: null,
            grid: null,
        },

        // 曲线是否平滑
        smooth: true,
    })

    line.render()
}

const 品种列表 = () => {
    const [rowData, setRowData] = useState<type_基础品种信息[]>([])
    const [总可持仓金额, 设置总可持仓金额] = useState(0)

    const [columnDefs] = useState([
        {
            headerName: '基础',
            children: [
                // {
                //     field: '序号',
                //     width: 140,
                //     // columnGroupShow: 'open',
                //     cellRenderer: (params: any) => {
                //         return params.rowIndex + 1
                //     },
                // },
                {
                    field: '名称',
                    width: 100,
                },
                // {
                //     field: '代码',
                //     width: 140,
                //     // columnGroupShow: 'open',
                //     // cellRenderer: (params: any) => {
                //     //     const { data } = params as {
                //     //         data: type_基础品种信息_二级
                //     //     }

                //     //     return `${data.Code} / ${data.name}`
                //     // },
                // },
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
                    field: '连续60分数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`fengshi60min-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '连续分时数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxufengshi-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                // {
                //     field: '关注分时数据',
                //     sortable: true,
                //     width: CHART_WIDTH,
                //     cellRenderer: (params: ValueFormatterParams) => {
                //         const 数据: type_基础品种信息 = params.data
                //         return (
                //             <Box
                //                 id={`fengshi-${数据.代码}`}
                //                 sx={{
                //                     width: '100%',
                //                     height: CHART_HEIGHT,
                //                 }}
                //             ></Box>
                //         )
                //     },
                // },
                {
                    field: '连续5日数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu5ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '连续10日数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu10ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '连续30日数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu30ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '90日-方向标的',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu90ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '270日-方向标的',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu270ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '连续540日数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`lianxu540ri-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                {
                    field: '5年连续分时数据',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return (
                            <Box
                                id={`wunianlianxufengshi-${数据.代码}`}
                                sx={{
                                    width: '100%',
                                    height: CHART_HEIGHT,
                                }}
                            ></Box>
                        )
                    },
                },
                // {
                //     field: '连续日数据',
                //     sortable: true,
                //     width: CHART_WIDTH,
                //     cellRenderer: (params: ValueFormatterParams) => {
                //         const 数据: type_基础品种信息 = params.data
                //         return (
                //             <Box
                //                 id={`lianxuri-${数据.代码}`}
                //                 sx={{
                //                     width: '100%',
                //                     height: CHART_HEIGHT,
                //                 }}
                //             ></Box>
                //         )
                //     },
                // },

                {
                    field: '关注合约最新价格',
                    sortable: true,
                    width: CHART_WIDTH,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        const 价格 = params.value
                            ? params.value?.toFixed(0)
                            : '-'
                        return (
                            <Box>
                                <Box>{价格}</Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 30,
                                        background: 'black',
                                        border: '1px solid #EEE',
                                        color: 'white',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'black',
                                            zIndex: 0,
                                            textAlign: 'center',
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: `${
                                                100 + 数据.远近合约差价比例
                                            }%`,
                                            height: '90%',
                                            background: 'rgb(32 38 207 / 75%)',
                                            zIndex: 0,
                                            textAlign: 'center',
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -3,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 2,
                                            textAlign: 'center',
                                            fontSize: 11,
                                        }}
                                    >
                                        升贴: {数据.远近合约差价比例}%
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 30,
                                        background: 'black',
                                        border: '1px solid #EEE',
                                        color: 'white',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background:
                                                'linear-gradient(to right, green, blue, red)',
                                            zIndex: 0,
                                            textAlign: 'center',
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: `${
                                                100 - 数据.指定合约价位
                                            }%`,
                                            height: '100%',
                                            background: 'black',
                                            zIndex: 1,
                                            textAlign: 'center',
                                        }}
                                    ></Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -5,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            zIndex: 2,
                                            textAlign: 'center',
                                            fontSize: 11,
                                        }}
                                    >
                                        价位: {数据.指定合约价位}%
                                    </Box>
                                </Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '保证金比例',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '一手保证金',
                    sortable: true,
                    width: 140,
                    cellRenderer: (params: ValueFormatterParams) => {
                        return params.value ? params.value?.toFixed(0) : '-'
                    },
                },
                {
                    field: '类型',
                    sortable: true,
                    width: 140,
                },

                {
                    field: '关注合约',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '可持仓手数',
                    sortable: true,
                    width: 140,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const 数据: type_基础品种信息 = params.data
                        return `${数据.可持仓手数} / ${(
                            数据.可持仓金额 / 10000
                        ).toFixed(1)}w`
                    },
                },

                {
                    field: '最新主力价格',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '最低价',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '最高价',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '历史振幅',
                    sortable: true,
                    width: 140,
                },
                {
                    field: '历史价位',
                    sortable: true,
                    width: 140,
                    cellRenderer: (params: ValueFormatterParams) => {
                        return `${params.value}%`
                    },
                },
            ],
        },
    ])

    const 设置列表_全品种列表 = async () => {
        const 最新品种数据 = await 获取最新品种数据()
        setRowData(最新品种数据)

        // 获取连续合约和关注合约的日数据和分时数据
        let 追加记录数据: any = []

        for (let i = 0; i < 最新品种数据.length; i++) {
            const 品种 = 最新品种数据[i]
            const code = 品种.代码
            const 请求 = await fetch(`/ping_zhong_ri_feng_shi_shu_ju/${code}`)
            const { 状态, 数据 } = await 请求.json()

            if (状态 === true) {
                const { 连续日数据, 连续分时数据, 关注合约分时数据 } = 数据

                追加记录数据 = [
                    ...追加记录数据,
                    {
                        ...品种,
                        连续日数据,
                        连续分时数据,
                        关注合约分时数据,
                    },
                ]

                const 修正_连续合约分时60数据 = map((item: any) => {
                    return {
                        Date: item[0],
                        scales: parseInt(item[1]),
                    }
                })(连续分时数据)
                渲染图表(
                    品种,
                    takeLast(60)(修正_连续合约分时60数据),
                    `fengshi60min-${code}`,
                    0.1,
                    1
                )

                // const 修正_关注合约分时数据 = map((item: any) => {
                //     return {
                //         Date: item[0],
                //         scales: parseInt(item[1]),
                //     }
                // })(关注合约分时数据)
                // 渲染图表(品种, 修正_关注合约分时数据, `fengshi-${code}`, 0.1, 1)

                const 修正_连续分时数据 = map((item: any) => {
                    return {
                        Date: item[0],
                        scales: parseInt(item[1]),
                    }
                })(连续分时数据)
                渲染图表(
                    品种,
                    修正_连续分时数据,
                    `lianxufengshi-${code}`,
                    0.1,
                    1
                )

                // const 修正_连续日数据 = map((item: any) => {
                //     return {
                //         Date: item.d,
                //         scales: parseInt(item.c),
                //     }
                // })(连续日数据)

                // 渲染图表(品种, 修正_连续日数据, `lianxuri-${code}`, 0.1, 30)

                const 修正_五年连续日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(1020)(连续日数据))
                渲染图表(
                    品种,
                    修正_五年连续日数据,
                    `wunianlianxufengshi-${code}`,
                    0.1,
                    30
                )
                console.log(连续日数据)
                console.log(takeLast(5)(连续日数据))

                const 修正_连续5日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(5)(连续日数据))
                渲染图表(品种, 修正_连续5日数据, `lianxu5ri-${code}`, 0.1, 2)

                const 修正_连续10日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(10)(连续日数据))
                渲染图表(品种, 修正_连续10日数据, `lianxu10ri-${code}`, 0.1, 3)

                const 修正_连续30日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(30)(连续日数据))
                渲染图表(品种, 修正_连续30日数据, `lianxu30ri-${code}`, 0.2, 4)

                const 修正_连续90日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(90)(连续日数据))
                渲染图表(品种, 修正_连续90日数据, `lianxu90ri-${code}`, 0.2, 20)

                const 修正_连续270日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(270)(连续日数据))
                渲染图表(
                    品种,
                    修正_连续270日数据,
                    `lianxu270ri-${code}`,
                    0.2,
                    30
                )

                const 修正_连续540日数据 = map((item: any) => {
                    return {
                        Date: item.d,
                        scales: parseInt(item.c),
                    }
                })(takeLast(540)(连续日数据))
                渲染图表(
                    品种,
                    修正_连续540日数据,
                    `lianxu540ri-${code}`,
                    0.2,
                    30
                )
            }
        }

        console.log(追加记录数据)

        设置总可持仓金额(
            reduce((count, 品种: type_基础品种信息) => {
                return count + 品种.可持仓金额
            }, 0)(最新品种数据)
        )
    }

    useEffect(() => {
        设置列表_全品种列表()
        setInterval(() => {
            设置列表_全品种列表()
        }, 1000 * 60 * 5)
    }, [])

    return (
        <Box
            className="ag-theme-alpine"
            sx={{ height: '85vh', width: '98%', margin: '5px 1%' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                rowHeight={140}
                getRowStyle={(params: RowClassParams) => {
                    return params.rowIndex % 2
                        ? { backgroundColor: '#EEE' }
                        : { backgroundColor: 'white' }
                }}
            ></AgGridReact>

            <Box>
                <Box>总可持仓金额: {(总可持仓金额 / 10000).toFixed(2)}w</Box>
            </Box>
        </Box>
    )
}

export default 品种列表
