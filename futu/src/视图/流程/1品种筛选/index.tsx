import { FC, useEffect, useState } from 'react'
import Box from '@mui/system/Box'
import {
    match,
    map,
    dropLast,
    filter,
    sort,
    replace,
    groupBy,
    take,
    values,
    compose,
    flatten,
    takeLast,
} from 'ramda'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CachedIcon from '@mui/icons-material/Cached'
import Snackbar from '@mui/material/Snackbar'

import 广发交易提示 from 'src/视图/流程/1品种筛选/数据/广发交易提示'
import 无法交易品种列表 from 'src/视图/流程/1品种筛选/数据/无法交易品种列表'
import 全品种基础信息, {
    type_品种基础信息,
} from 'src/视图/流程/1品种筛选/数据/全品种基础信息'

const 最低杠杆比例 = 4
const 最低沉淀资金 = 13
const 最高保证金 = 18000
const 最少年期 = 2018
const 最小全历史波幅 = 1.5
const 最小年限5历史波幅 = 1
const 品种详情数据KEY = '品种详情数据'

// const 全品种基础信息FIX = map((item: any) => {
//     return {
//         ...item,
//         手动过滤: false,
//     }
// })(全品种基础信息 as any)
// console.log(JSON.stringify(全品种基础信息FIX, null, 2))

interface type_品种 {
    代码: string
    名称: string
    保证金比例: number
    一手保证金: number
    杠杆: number
    沉淀资金: number
    一手手数: number
    行业: string
    上市日期: number
    全历史波幅: number
    全历史最低价格: number
    全历史最高价格: number
    年限5历史最低价格: number
    年限5历史最高价格: number
    年限5历史波幅: number
    手动过滤: boolean
    一日数据: {
        c: number
        p: number
    }
}

interface type_单品种日数 {
    p: number
    c: number
}

const 获取全部品种 = () => {
    const 数据字符串 = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(广发交易提示)

    const 数据: type_品种[] = map((item: string) => {
        const rateStr = match(/\d{1,2}%/)(item)
        const 保证金比例 = parseInt(dropLast(1)(rateStr[0])) / 100

        const code = match(/[a-zA-Z]{1,2}/)(item)[0]
        const upCode = code.toUpperCase()
        const 名称 = item.substr(0, item.indexOf(code)).trim()

        return {
            代码: upCode,
            名称,
            保证金比例,
            杠杆: parseFloat((1 / 保证金比例).toFixed(2)),
            沉淀资金: 0,
            一手保证金: 0,
            行业: '',
            一手手数: 0,
            上市日期: 2000,
            全历史波幅: 0,
            全历史最低价格: 0,
            全历史最高价格: 0,
            年限5历史最低价格: 0,
            年限5历史最高价格: 0,
            年限5历史波幅: 0,
            手动过滤: false,
            一日数据: {
                c: 0,
                p: 0,
            },
        }
    })(数据字符串)

    const sortData = sort((a: type_品种, b: type_品种) => {
        return b.杠杆 - a.杠杆
    })(数据)

    return sortData
}

const CustomAccordion: FC<{
    expanded: boolean
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
    title: string
}> = payload => {
    const { expanded, setExpanded, title, children } = payload

    return (
        <Accordion
            disableGutters
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
                marginLeft: 2,
                '&.MuiPaper-elevation': {
                    background: 'none',
                    borderRadius: 0,
                    color: 'white',
                    borderBottom: '1px solid rgb(52, 52, 52)',
                },
                '& .MuiAccordionSummary-root': {
                    fontSize: 13,
                    minHeight: 35,
                    '&:hover': {
                        background: 'rgb(52, 52, 52)',
                    },
                },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon color={'info'} />}>
                {title}
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 0,
                    height: 600,
                    overflow: 'auto',
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

const 品种方块: FC<{ 品种: type_品种; 可交易: boolean }> = ({
    品种,
    可交易,
    children,
}) => {
    return (
        <Box
            key={品种.代码}
            sx={{
                display: 'flex',
                width: '100%',
                padding: 1,
                border: '1px solid rgb(52, 52, 52)',
                margin: 0.5,
                justifyContent: 'space-between',
                background: 可交易 ? 'inherit' : 'rgba(63, 28, 28, 0.7)',
                '&:hover': {
                    background: 'rgb(52, 52, 52)',
                },
            }}
        >
            <Box sx={{ width: 30 }}>{品种.代码}</Box>
            <Box sx={{ width: 60, overflow: 'hidden' }}>
                {take(4)(品种.名称)}
            </Box>
            {children}
        </Box>
    )
}

const 单品种日数据获取 = async (合约: string) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 600))

        const 请求 = await fetch(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
        )
        const 数据 = await 请求.text()
        const 日列表字符串_特殊 = match(/\[.*\]/)(数据)
        const 日列表字符串 = 日列表字符串_特殊.length
            ? replace('\\', '')(日列表字符串_特殊[0])
            : ''

        const 结果 = JSON.parse(日列表字符串)
        return 结果 as type_单品种日数[]
    } catch (error) {
        console.error(error)
    }

    return []
}

const 获取极端价格 = (日数据列表: type_单品种日数[]) => {
    const 全部当前价: number[] = compose(
        filter((数据: number) => 数据 > 0),
        map((数据: type_单品种日数) => {
            return 数据.c
        })
    )(日数据列表)

    const 价格排序 = sort((a: number, b: number) => b - a)(全部当前价)

    const 最高价 = 价格排序[0]
    const 最低价 = 价格排序[价格排序.length - 1]

    return [最低价, 最高价]
}

const 品种筛选 = () => {
    const [全部品种, set全部品种] = useState<type_品种[]>([])

    const [expanded1, setExpanded1] = useState(false)
    const [expanded2, setExpanded2] = useState(false)
    const [expanded3, setExpanded3] = useState(false)
    const [expanded4, setExpanded4] = useState(false)
    const [expanded5, setExpanded5] = useState(false)
    const [expanded6, setExpanded6] = useState(false)
    const [expanded7, setExpanded7] = useState(false)
    const [expanded8, setExpanded8] = useState(false)
    const [expanded9, setExpanded9] = useState(false)
    const [expanded10, setExpanded10] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const 可交易品种 = filter((品种: type_品种) => {
        return !无法交易品种列表[品种.代码]
    })(全部品种)
    const 不可交易品种 = filter((品种: type_品种) => {
        return !!无法交易品种列表[品种.代码]
    })(全部品种)

    const 未手动过滤品种 = filter((品种: type_品种) => {
        return !全品种基础信息[品种.代码].手动过滤
    })(可交易品种)
    const 手动过滤品种 = filter((品种: type_品种) => {
        return 全品种基础信息[品种.代码].手动过滤
    })(可交易品种)

    const 杠杆正常品种 = filter((品种: type_品种) => {
        return 品种.杠杆 > 最低杠杆比例
    })(未手动过滤品种)
    const 杠杆过低品种 = filter((品种: type_品种) => {
        return 品种.杠杆 < 最低杠杆比例
    })(未手动过滤品种)

    const sort沉淀资金 = sort((a: type_品种, b: type_品种) => {
        return b.沉淀资金 - a.沉淀资金
    })(杠杆正常品种)
    const 沉淀资金正常品种 = filter((品种: type_品种) => {
        return 品种.沉淀资金 >= 最低沉淀资金
    })(sort沉淀资金)
    const 沉淀资金过低品种 = filter((品种: type_品种) => {
        return 品种.沉淀资金 < 最低沉淀资金
    })(sort沉淀资金)

    const sort保证金 = sort((a: type_品种, b: type_品种) => {
        return a.一手保证金 - b.一手保证金
    })(沉淀资金正常品种)
    const 保证金正常品种 = filter((品种: type_品种) => {
        return 品种.一手保证金 <= 最高保证金
    })(sort保证金)
    const 保证金过高品种 = filter((品种: type_品种) => {
        return 品种.一手保证金 > 最高保证金
    })(sort保证金)

    const sort上市日期 = sort((a: type_品种, b: type_品种) => {
        return a.上市日期 - b.上市日期
    })(保证金正常品种)
    const 老品种列表 = filter((品种: type_品种) => {
        return 品种.上市日期 <= 最少年期
    })(sort上市日期)
    const 新品种列表 = filter((品种: type_品种) => {
        return 品种.上市日期 > 最少年期
    })(sort上市日期)

    const sort全历史波幅 = sort((a: type_品种, b: type_品种) => {
        return b.全历史波幅 - a.全历史波幅
    })(老品种列表)
    const 全历史波幅正常列表 = filter((品种: type_品种) => {
        return 品种.全历史波幅 > 最小全历史波幅
    })(sort全历史波幅)
    const 全历史波幅过低列表 = filter((品种: type_品种) => {
        return 品种.全历史波幅 <= 最小全历史波幅
    })(sort全历史波幅)

    const sort年限5历史波幅 = sort((a: type_品种, b: type_品种) => {
        return b.年限5历史波幅 - a.年限5历史波幅
    })(老品种列表)
    const 年限5历史波幅正常列表 = filter((品种: type_品种) => {
        return 品种.年限5历史波幅 > 最小年限5历史波幅
    })(sort年限5历史波幅)
    const 年限5历史波幅过低列表 = filter((品种: type_品种) => {
        return 品种.年限5历史波幅 <= 最小年限5历史波幅
    })(sort年限5历史波幅)

    const group行业 = groupBy((品种: type_品种) => {
        return 品种.行业
    })(年限5历史波幅正常列表)
    const group行业列表 = compose((list: type_品种[]) => {
        return flatten(list)
    }, values)(group行业)

    const handle加载品种详情数据 = async () => {
        const rv: any[] = []

        //  全部品种.length
        for (let i = 0; i < 全部品种.length; i++) {
            const 品种 = 全部品种[i]
            const 合约 = `${品种.代码}0`
            const 单品种日数据: type_单品种日数[] = await 单品种日数据获取(合约)
            const 一日数据 = 单品种日数据[单品种日数据.length - 1]
            const [全历史最低价格, 全历史最高价格] = 获取极端价格(单品种日数据)
            const 全历史波幅 =
                (全历史最高价格 - 全历史最低价格) / 全历史最低价格

            const [年限5历史最低价格, 年限5历史最高价格] = 获取极端价格(
                takeLast(5 * 4 * 12 * 5)(单品种日数据)
            )
            const 年限5历史波幅 =
                (年限5历史最高价格 - 年限5历史最低价格) / 年限5历史最低价格

            const 当前价格 = 一日数据.c
            const 一手手数 = 全品种基础信息[品种.代码].一手手数
            const 一手保证金 = 当前价格 * 一手手数 * 品种.保证金比例
            const 行业 = 全品种基础信息[品种.代码].行业
            const 上市日期 = 全品种基础信息[品种.代码].上市日期

            rv.push({
                ...品种,
                一日数据,
                沉淀资金:
                    (一日数据.p * 当前价格 * 一手手数 * 品种.保证金比例) /
                    100000000,
                一手保证金,
                一手手数,
                行业,
                上市日期,
                全历史波幅,
                全历史最低价格,
                全历史最高价格,

                年限5历史最低价格,
                年限5历史最高价格,
                年限5历史波幅,

                手动过滤: 全品种基础信息[品种.代码].手动过滤,
            })
        }

        setOpenSnackbar(true)
        localStorage.setItem(品种详情数据KEY, JSON.stringify(rv))
    }

    const 获取本地存储品种详情数据 = async () => {
        const rv = await localStorage.getItem(品种详情数据KEY)
        if (rv) {
            const data: type_品种[] = JSON.parse(rv)

            // const fixData = map((品种: type_品种) => {
            //     if (品种.一日数据) {
            //         const 当前价格 = 品种.一日数据.c

            //         return {
            //             ...品种,
            //             // 保证金比例: 品种.保证金比例 / 100,
            //             // 杠杆: parseFloat(
            //             //     (1 / (品种.保证金比例 / 100)).toFixed(2)
            //             // ),
            //             // 一手保证金: 当前价格 * 品种.一手手数 * 品种.保证金比例,
            //             沉淀资金:
            //                 (品种.一日数据.p *
            //                     当前价格 *
            //                     品种.一手手数 *
            //                     品种.保证金比例) /
            //                 100000000,
            //             // 行业: 全品种基础信息[品种.代码].行业,
            //             // 上市日期: 全品种基础信息[品种.代码].上市日期,
            //         }
            //     }
            // })(data)

            // console.log(fixData)
            // localStorage.setItem(品种详情数据KEY, JSON.stringify(fixData))

            // const obj = {}
            // const sdata = sort((a: type_品种, b: type_品种) => {
            //     return a.代码.localeCompare(b.代码)
            // })(data)

            // map((品种: type_品种) => {
            //     obj[品种.代码] = {
            //         一手手数: 0,
            //         名称: 品种.名称,
            //     }
            // })(sdata)

            // console.log(JSON.stringify(data, null, 2))

            if (data) {
                set全部品种(data)
                return
            }
        }

        const 全部品种: type_品种[] = 获取全部品种()
        set全部品种(全部品种)
    }

    useEffect(() => {
        获取本地存储品种详情数据()
    }, [])

    return (
        <Box sx={{}}>
            <Box
                sx={{
                    display: 'flex',
                    height: 35,
                    paddingLeft: 1,
                    paddingRight: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgb(52, 52, 52)',
                }}
            >
                品种筛选
                <CachedIcon
                    sx={{
                        cursor: 'pointer',
                        color: 'rgb(99, 99, 99)',
                        '&:hover': {
                            color: 'white',
                        },
                    }}
                    onClick={handle加载品种详情数据}
                />
            </Box>

            <CustomAccordion
                expanded={expanded1}
                setExpanded={setExpanded1}
                title={`全部品种 - ${全部品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(全部品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded2}
                setExpanded={setExpanded2}
                title={`可交易品种 - ${可交易品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(可交易品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(不可交易品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded10}
                setExpanded={setExpanded10}
                title={`未手动过滤品种 - ${未手动过滤品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(未手动过滤品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(手动过滤品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded3}
                setExpanded={setExpanded3}
                title={`杠杆正常品种 - ${杠杆正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                    </品种方块>
                ))(杠杆正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                    </品种方块>
                ))(杠杆过低品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded4}
                setExpanded={setExpanded4}
                title={`沉淀资金正常品种 - ${沉淀资金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 50 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                    </品种方块>
                ))(沉淀资金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 50 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                    </品种方块>
                ))(沉淀资金过低品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded5}
                setExpanded={setExpanded5}
                title={`保证金正常品种 - ${保证金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                    </品种方块>
                ))(保证金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                    </品种方块>
                ))(保证金过高品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded6}
                setExpanded={setExpanded6}
                title={`老品种 - ${老品种列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                    </品种方块>
                ))(老品种列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                    </品种方块>
                ))(新品种列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded7}
                setExpanded={setExpanded7}
                title={`全历史波幅正常列表 - ${全历史波幅正常列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.全历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(全历史波幅正常列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.全历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(全历史波幅过低列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded8}
                setExpanded={setExpanded8}
                title={`年限5历史波幅正常列表 - ${年限5历史波幅正常列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.年限5历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(年限5历史波幅正常列表)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false}>
                        <Box sx={{ width: 60 }}>{品种.上市日期}</Box>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {品种.年限5历史波幅.toFixed(2)}
                        </Box>
                    </品种方块>
                ))(年限5历史波幅过低列表)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded9}
                setExpanded={setExpanded9}
                title={`行业 - ${group行业列表.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true}>
                        <Box sx={{ width: 60 }}>{take(2)(品种.行业)}</Box>
                        <Box sx={{ width: 60 }}>
                            {(品种.一手保证金 / 10000).toFixed(2)}
                        </Box>
                        <Box sx={{ width: 40 }}>
                            {品种.沉淀资金.toFixed(0)}亿
                        </Box>
                        {/* <Box sx={{ width: 50 }}>{品种.杠杆}</Box> */}
                    </品种方块>
                ))(group行业列表)}
            </CustomAccordion>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message="加载品种详情数据成功!"
            />
        </Box>
    )
}

export default 品种筛选
