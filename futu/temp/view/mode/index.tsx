import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import { RowClassParams, ValueFormatterParams } from 'ag-grid-enterprise'
import { addIndex, compose, filter, map, range, reduce } from 'ramda'
import Box from '@mui/system/Box'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'

import { get_品种基础信息列表 } from 'src/view/mode/calFunc'
import { Button } from '@mui/material'
import { type_品种信息, 价格波幅类型, 预期方向类型 } from './type'
import 当前 from 'src/数据/当前'

const ROW_HEIGHT = 130

const Mode = () => {
    const [品种基础信息列表, 全品种列表] = get_品种基础信息列表()

    const [rowData] = useState(品种基础信息列表)

    const 总盈亏 = reduce((count, item: type_品种信息) => {
        return item.最大持仓数 > 0 ? count + item.持仓盈亏 : count
    }, 0)(rowData)

    const 总持仓金额 = reduce((count, item: type_品种信息) => {
        return item.最大持仓数 > 0 ? count + item.持仓金额 : count
    }, 0)(rowData)

    const [columnDefs] = useState([
        {
            headerName: '基础',
            children: [
                {
                    field: `序号(${rowData.length}/-${
                        全品种列表.length - rowData.length
                    })`,
                    width: 140,
                    // columnGroupShow: 'open',
                    cellRenderer: (params: any) => {
                        return params.rowIndex + 1
                    },
                },
                {
                    field: '品种',
                    width: 100,
                    sortable: true,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }

                        return (
                            <Box>
                                <Box>{params.value}</Box>
                                <Box>{data.品类}</Box>
                                <Box>{data.名称}</Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '品类',
                    sortable: true,
                    width: 120,
                    columnGroupShow: 'open',
                },
                { field: '名称', width: 120, columnGroupShow: 'open' },
                {
                    field: '关注度',
                    sortable: true,
                    width: 160,
                    filter: 'agNumberColumnFilter',
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params
                        return map((index: number) =>
                            index < data.关注度 ? (
                                <StarIcon key={index} color="success" />
                            ) : (
                                <StarOutlineIcon key={index} />
                            )
                        )(range(0, 5))
                    },
                },
                {
                    headerName: '沉淀资金(亿)',
                    field: '沉淀资金',
                    sortable: true,
                    width: 160,
                    filter: 'agNumberColumnFilter',
                    columnGroupShow: 'open',
                },
                {
                    field: '杠杆',
                    sortable: true,
                    width: 140,
                    filter: 'agNumberColumnFilter',
                    columnGroupShow: 'open',
                    // comparator: (
                    //     valueA: any,
                    //     valueB: any,
                    //     nodeA: any,
                    //     nodeB: any,
                    //     isInverted: boolean
                    // ) => {
                    //     if (valueA == valueB) return 0
                    //     return valueA > valueB ? 1 : -1
                    // },
                },
                {
                    field: '保证金比例',
                    sortable: true,
                    width: 140,
                    columnGroupShow: 'open',
                },

                {
                    field: '主力合约',
                    sortable: true,
                    width: 120,
                    columnGroupShow: 'open',
                },
                {
                    field: '当前价格',
                    sortable: true,
                    width: 120,
                    columnGroupShow: 'open',
                },
                {
                    field: '基准比率',
                    sortable: true,
                    width: 120,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        return params.value.toFixed(2)
                    },
                },
                {
                    field: '一手保证金',
                    sortable: true,
                    width: 120,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        return params.value.toFixed(0)
                    },
                },
                {
                    field: 'Code',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                },
            ],
        },

        {
            headerName: '信息',
            children: [
                {
                    field: '当前价位',
                    sortable: true,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }

                        const rate = data['当前价位']

                        if (!rate) {
                            return '-'
                        }

                        return (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: ROW_HEIGHT,
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
                                        width: `${100 - rate}%`,
                                        height: '100%',
                                        background: 'black',
                                        zIndex: 1,
                                        textAlign: 'center',
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 2,
                                        textAlign: 'center',
                                    }}
                                >
                                    {data['当前价格']} - {rate}%
                                </Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '价格及预期图',
                    width: 400,
                    sortable: true,
                    comparator: (
                        valueA: any,
                        valueB: any,
                        nodeA: any,
                        nodeB: any
                    ) => {
                        const a价格增减比例 = nodeA.data.价格增减比例
                        const b价格增减比例 = nodeB.data.价格增减比例

                        if (a价格增减比例 == b价格增减比例) return 0
                        return a价格增减比例 > b价格增减比例 ? 1 : -1
                    },
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }
                        const 价格波幅统计 = data['价格波幅统计']
                        const height = ROW_HEIGHT

                        return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: '#222',
                                    height,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        height,
                                    }}
                                >
                                    {addIndex(map)(
                                        (item: any, idx: number, list: any) => {
                                            return (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        width: 5,
                                                        height: 3,
                                                        color: 'white',
                                                        fontSize: 8,
                                                        marginTop: `${
                                                            height * -item * 4
                                                        }px`,
                                                        marginRight: 0.2,
                                                        background:
                                                            data.价格波幅趋势 ===
                                                            价格波幅类型.多
                                                                ? 'red'
                                                                : data.价格波幅趋势 ===
                                                                  价格波幅类型.空
                                                                ? 'green'
                                                                : 'grey',
                                                    }}
                                                >
                                                    {/* {(item * 100).toFixed(1)} */}
                                                </Box>
                                            )
                                        }
                                    )(价格波幅统计)}
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color:
                                                data.价格增减比例 > 0
                                                    ? 'red'
                                                    : 'green',
                                            marginRight: 1,
                                        }}
                                    >
                                        {data.价格增减比例.toFixed(2)}%
                                    </Box>
                                </Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '预期波动',
                    width: 180,
                    sortable: true,
                    comparator: (
                        valueA: any,
                        valueB: any,
                        nodeA: any,
                        nodeB: any
                    ) => {
                        const a预期波动 = Math.abs(nodeA.data.预期波动) || 0
                        const b预期波动 = Math.abs(nodeB.data.预期波动) || 0

                        if (a预期波动 == b预期波动) return 0
                        return a预期波动 > b预期波动 ? 1 : -1
                    },
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }

                        if (!data.预期波动) {
                            return '-'
                        }

                        const rate = parseInt(
                            ((data.价格增减比例 / data.预期波动) * 100).toFixed(
                                0
                            )
                        )

                        return (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: ROW_HEIGHT,
                                    background: 'black',
                                    border: '1px solid #EEE',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
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
                                        width: `${100 - rate}%`,
                                        height: '100%',
                                        background: 'black',
                                        zIndex: 1,
                                        textAlign: 'center',
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 2,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {data.预期波动}%
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                color:
                                                    data.预期趋势 ===
                                                    价格波幅类型.多
                                                        ? 'red'
                                                        : 'green',
                                            }}
                                        >
                                            ({data.预期趋势})
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            color: rate > 0 ? 'green' : 'red',
                                        }}
                                    >
                                        {rate}%
                                    </Box>
                                </Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '历史10年最高',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                },
                {
                    field: '历史10年最低',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                },
                {
                    field: '历史波幅',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }
                        const 历史10年最高 = data.历史10年最高
                        const 历史10年最低 = data.历史10年最低
                        return `${data.历史波幅.toFixed(0)}%`
                    },
                },

                {
                    field: '最大持仓数',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                },
                {
                    field: '最大持仓金额',
                    width: 140,
                    sortable: true,
                    columnGroupShow: 'open',
                },
            ],
        },

        {
            headerName: '持仓',
            children: [
                {
                    field: `持仓合约 / ${Math.round(
                        总盈亏 / 10000
                    )}w / ${Math.round(总持仓金额 / 10000)}w / ${(
                        (总盈亏 / 总持仓金额) *
                        100
                    ).toFixed(0)}%`,
                    width: 280,
                    sortable: true,
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }
                        const 推荐 = (
                            <Box
                                sx={{
                                    color: 'grey',
                                    fontSize: 11,
                                }}
                            >
                                {data.合约剩余天数 < 30 * 3
                                    ? `(推荐：${data.推荐合约})`
                                    : ''}
                            </Box>
                        )

                        return data.持仓手数 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    lineHeight: 1.4,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'end',
                                    }}
                                >
                                    <Box
                                        sx={{ fontWeight: 'bold' }}
                                    >{`${data.持仓合约}`}</Box>
                                    {推荐}
                                </Box>
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Box>{data.持仓单价}</Box>
                                        <Box
                                            sx={{
                                                color:
                                                    data['持仓方向'] ===
                                                    预期方向类型.看多
                                                        ? 'red'
                                                        : 'green',
                                            }}
                                        >
                                            ({data['持仓方向']})
                                        </Box>
                                        *{data.持仓手数}
                                        <Box
                                            sx={{
                                                color:
                                                    params.data.最大持仓数 >
                                                    data.持仓手数
                                                        ? 'green'
                                                        : params.data
                                                              .最大持仓数 <
                                                          data.持仓手数
                                                        ? 'red'
                                                        : 'grey',
                                            }}
                                        >
                                            ({params.data.最大持仓数})
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            color:
                                                data['持仓盈亏'] < 0
                                                    ? 'red'
                                                    : 'green',
                                        }}
                                    >
                                        {data['持仓盈亏'] > 0 ? '盈:' : '亏:'}
                                        {data.持仓盈亏} /
                                        {(
                                            (data.持仓盈亏 / data.持仓金额) *
                                            100
                                        ).toFixed(0)}
                                        % / {(data.持仓金额 / 10000).toFixed(1)}
                                        w
                                    </Box>
                                    <Box sx={{ color: 'grey' }}>
                                        回撤平半仓点：
                                        {data.回撤半平点.toFixed(0)}
                                    </Box>
                                    <Box sx={{ color: 'grey' }}>
                                        回撤平全仓点：
                                        {data.回撤全平点.toFixed(0)}
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    color: 'grey',
                                    fontSize: 11,
                                }}
                            >
                                <Box>{推荐}</Box>
                                <Box>
                                    可持：{params.data.最大持仓数}
                                    {data.最大持仓金额
                                        ? `(${(
                                              data.最大持仓金额 / 10000
                                          ).toFixed(1)}w)`
                                        : ''}
                                </Box>
                                <Box>{data.持仓合约}</Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    预期方向:
                                    <Box
                                        sx={{
                                            fontWeight: 'bold',
                                            color:
                                                params.data.预期趋势 ===
                                                价格波幅类型.空
                                                    ? 'green'
                                                    : 'red',
                                        }}
                                    >
                                        {params.data.预期趋势}
                                    </Box>
                                </Box>
                            </Box>
                        )
                    },
                },
                {
                    field: '合约剩余天数',
                    width: 150,
                    sortable: true,
                    columnGroupShow: 'open',
                },
                {
                    field: '持仓单价',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }
                        return data.持仓合约.length ? params.value : '-'
                    },
                },
                {
                    field: '持仓手数',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params as { data: type_品种信息 }
                        return data.持仓合约.length
                            ? `${params.value} (${params.data.最大持仓数})`
                            : '-'
                    },
                },
                {
                    field: '持仓方向',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params
                        return data.持仓手数 > 0 ? (
                            <Box
                                sx={{
                                    color:
                                        data['持仓方向'] === 预期方向类型.看多
                                            ? 'red'
                                            : 'green',
                                }}
                            >
                                {data['持仓方向']}
                            </Box>
                        ) : (
                            '-'
                        )
                    },
                },
                {
                    field: '持仓盈亏',
                    width: 120,
                    sortable: true,
                    columnGroupShow: 'open',
                    cellRenderer: (params: ValueFormatterParams) => {
                        const { data } = params
                        return data.持仓合约.length ? (
                            <Box
                                sx={{
                                    color:
                                        data['持仓盈亏'] < 0 ? 'red' : 'green',
                                }}
                            >
                                {data['持仓盈亏']}
                            </Box>
                        ) : (
                            '-'
                        )
                    },
                },
                {
                    field: '持仓金额',
                    width: 120,
                    columnGroupShow: 'open',
                    sortable: true,
                },
                {
                    field: '到期天数',
                    width: 120,
                    columnGroupShow: 'open',
                    sortable: true,
                },
            ],
        },

        {
            headerName: '决策',
            children: [
                {
                    field: '评分',
                    width: 120,
                    sortable: true,
                },
                { field: '风险度', sortable: true },
                { field: '操作提示', sortable: true, columnGroupShow: 'open' },
            ],
        },

        {
            headerName: '记录',
            children: [
                {
                    field: '交易',
                },
            ],
        },
    ])

    const handleCopyData = () => {
        alert('复制成功！')
    }

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: '90vh', width: '96%', margin: '20px 2%' }}
        >
            <AgGridReact
                rowHeight={ROW_HEIGHT}
                rowData={rowData}
                columnDefs={columnDefs}
                getRowStyle={(params: RowClassParams) => {
                    return params.rowIndex % 2
                        ? { backgroundColor: '#EEE' }
                        : { backgroundColor: 'white' }
                }}
            ></AgGridReact>
            <CopyToClipboard
                text={JSON.stringify(全品种列表, null, 2)}
                onCopy={handleCopyData}
            >
                <Button sx={{ marginTop: 1, padding: 1, background: '#EEE' }}>
                    复制列表数据
                </Button>
            </CopyToClipboard>
        </div>
    )
}

export default Mode
