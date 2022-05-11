import { FC, useEffect, useState } from 'react'
import Box from '@mui/system/Box'
import { match, map, dropLast, filter, sort, replace } from 'ramda'

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
const 最低沉淀资金 = 5
const 品种详情数据KEY = '品种详情数据'

interface type_品种 {
    代码: string
    名称: string
    保证金比例: number
    杠杆: number
    沉淀资金: number
    一手手数: number
    一日数据: {
        c: number
        p: number
    }
}

const 获取全部品种 = () => {
    const 数据字符串 = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(广发交易提示)

    const 数据: type_品种[] = map((item: string) => {
        const rateStr = match(/\d{1,2}%/)(item)
        const 保证金比例 = parseInt(dropLast(1)(rateStr[0]))

        const code = match(/[a-zA-Z]{1,2}/)(item)[0]
        const upCode = code.toUpperCase()
        const 名称 = item.substr(0, item.indexOf(code)).trim()

        return {
            代码: upCode,
            名称,
            保证金比例,
            杠杆: parseFloat((1 / (保证金比例 / 100)).toFixed(2)),
            沉淀资金: 0,
            一手手数: 0,
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
                    height: 400,
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
                background: 可交易 ? 'inhreft' : 'rgba(63, 28, 28, 0.7)',
                '&:hover': {
                    background: 'rgb(52, 52, 52)',
                },
            }}
        >
            <Box sx={{ width: 40 }}>{品种.代码}</Box>
            <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
            <Box sx={{ width: 50 }}>{品种.沉淀资金.toFixed(0)}亿</Box>
            <Box sx={{ width: 100, overflow: 'hidden' }}>{品种.名称}</Box>
        </Box>
    )
}

const 单品种日数据获取 = async (合约: string) => {
    try {
        const 请求 = await fetch(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
        )
        const 数据 = await 请求.text()
        const 日列表字符串_特殊 = match(/\[.*\]/)(数据)
        const 日列表字符串 = 日列表字符串_特殊.length
            ? replace('\\', '')(日列表字符串_特殊[0])
            : ''

        await new Promise(resolve => setTimeout(resolve, 500))

        const 结果 = JSON.parse(日列表字符串)
        return 结果 && 结果[结果.length - 1]
    } catch (error) {
        console.error(error)
    }

    return []
}

const 品种筛选 = () => {
    const [全部品种, set全部品种] = useState<type_品种[]>([])

    const [expanded1, setExpanded1] = useState(false)
    const [expanded2, setExpanded2] = useState(false)
    const [expanded3, setExpanded3] = useState(false)
    const [expanded4, setExpanded4] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const 可交易品种 = filter((品种: type_品种) => {
        return !无法交易品种列表[品种.代码]
    })(全部品种)
    const 不可交易品种 = filter((品种: type_品种) => {
        return !!无法交易品种列表[品种.代码]
    })(全部品种)

    const 保证金正常品种 = filter((品种: type_品种) => {
        return 品种.杠杆 > 最低杠杆比例
    })(可交易品种)
    const 保证金过低品种 = filter((品种: type_品种) => {
        return 品种.杠杆 < 最低杠杆比例
    })(可交易品种)

    const 沉淀资金正常品种 = filter((品种: type_品种) => {
        return 品种.沉淀资金 >= 最低沉淀资金
    })(保证金正常品种)
    const 沉淀资金过低品种 = filter((品种: type_品种) => {
        return 品种.沉淀资金 < 最低沉淀资金
    })(保证金正常品种)

    const handle加载品种详情数据 = async () => {
        const rv: any[] = []

        for (let i = 0; i < 全部品种.length; i++) {
            const 品种 = 全部品种[i]
            const 合约 = `${品种.代码}0`
            const 结果 = await 单品种日数据获取(合约)

            const 一手手数 = 全品种基础信息[品种.代码].一手手数

            rv.push({
                ...品种,
                一日数据: 结果,
                沉淀资金: 结果.p * 结果.c,
                一手手数,
            })
        }

        setOpenSnackbar(true)
        localStorage.setItem(品种详情数据KEY, JSON.stringify(rv))
    }

    const 获取本地存储品种详情数据 = async () => {
        const rv = await localStorage.getItem(品种详情数据KEY)
        if (rv) {
            const data: type_品种[] = JSON.parse(rv)

            // const 沉淀 = map((品种: type_品种) => {
            //     if (品种.一日数据) {
            //         return {
            //             ...品种,
            //             沉淀资金:
            //                 (品种.一日数据?.p * 品种.一日数据?.c) / 100000000,
            //         }
            //     }
            // })(data)

            // localStorage.setItem(品种详情数据KEY, JSON.stringify(沉淀))
            const obj = {}
            const sdata = sort((a: type_品种, b: type_品种) => {
                return a.代码.localeCompare(b.代码)
            })(data)

            map((品种: type_品种) => {
                obj[品种.代码] = {
                    一手手数: 0,
                    名称: 品种.名称,
                }
            })(sdata)

            console.log(JSON.stringify(obj, null, 2))

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
                expanded={expanded3}
                setExpanded={setExpanded3}
                title={`保证金正常品种 - ${保证金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(保证金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(保证金过低品种)}
            </CustomAccordion>

            <CustomAccordion
                expanded={expanded4}
                setExpanded={setExpanded4}
                title={`沉淀资金正常品种 - ${沉淀资金正常品种.length}`}
            >
                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={true} />
                ))(沉淀资金正常品种)}

                {map((品种: type_品种) => (
                    <品种方块 key={品种.代码} 品种={品种} 可交易={false} />
                ))(沉淀资金过低品种)}
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
