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
    reduce,
    find,
} from 'ramda'

import 品种筛选 from 'src/视图/流程/1品种筛选'
import 辅助决策 from 'src/视图/流程/2辅助决策'
import 实盘交易 from 'src/视图/流程/3实盘交易'

import 广发交易提示 from 'src/视图/流程/数据/广发交易提示'
import 无法交易品种列表 from 'src/视图/流程/数据/无法交易品种列表'
import 全品种基础信息 from 'src/视图/流程/数据/全品种基础信息'

const 品种详情数据KEY = '品种详情数据'

// 过滤条件
const 最低杠杆比例 = 4
const 最低沉淀资金 = 13
const 最高保证金 = 18000
const 最少年期 = 2018
const 最小全历史波幅 = 1.5
const 最小年限5历史波幅 = 0.945

const 可补仓次数 = 2
const 可补仓亏损边界 = 1 || 0.68 // 亏损比例
const 每次补仓系数 = 0.35
const 亏损范围系数 = 0.7
const 品种平均极端波幅 = 3

// 资金
const 总投资金 = 410000
const 可持仓资金系数 = 0.28
const 可持仓资金 = 总投资金 * 可持仓资金系数

// const 全品种基础信息FIX = map((item: any) => {
//     return {
//         ...item,
//         手动过滤: false,
//     }
// })(全品种基础信息 as any)
// console.log(JSON.stringify(全品种基础信息FIX, null, 2))

export interface type_品种 {
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
    初始可持仓额度: number
    初始持仓真实额度: number
    初始持仓手数: number
    一补可持仓真实额度: number
    一补持仓手数: number
    二补可持仓真实额度: number
    二补持仓手数: number
    一日数据: {
        c: number
        p: number
    }
    持仓合约一日数据?: {
        c: number
        p: number
    }
    持仓合约一手保证金?: number
    持仓合约?: string
    持仓手数?: number
    持仓方向?: '多' | '空'
    持仓均价?: number
    持仓盈利?: number

    一亏补价格?: number
    一亏补当前亏损?: number
    一亏补后均价?: number

    二亏补价格?: number
    二亏补当前亏损?: number
    二亏补后均价?: number
}

export interface type_单品种日数 {
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
            初始持仓手数: 0,
            初始可持仓额度: 0,
            初始持仓真实额度: 0,
            一补可持仓真实额度: 0,
            一补持仓手数: 0,
            二补可持仓真实额度: 0,
            二补持仓手数: 0,
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

const 流程 = () => {
    const [全部品种, set全部品种] = useState<type_品种[]>([])

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

    const 交易行业总数 = values(group行业).length
    const 单行业初始可持仓额度 = 可持仓资金 / 交易行业总数
    const 每次补仓额度 = 单行业初始可持仓额度 * 每次补仓系数
    const 第一补仓后额度 = 单行业初始可持仓额度 + 每次补仓额度
    const 第二次补仓后额度 = 第一补仓后额度 + 每次补仓额度
    const 最大可持仓额度 = 第二次补仓后额度

    const 第一次补仓亏损临界额度 = 单行业初始可持仓额度 * 可补仓亏损边界
    const 第二次补仓亏损临界额度 =
        单行业初始可持仓额度 * (可补仓亏损边界 * 2) +
        每次补仓额度 * 可补仓亏损边界

    const 单品种最大亏损下限额度 = 第二次补仓亏损临界额度
    const 单品种最大亏损预期额度 = 最大可持仓额度 * 品种平均极端波幅

    const 全交易最大亏损下限额度 = 交易行业总数 * 单品种最大亏损下限额度
    const 全交易最大亏损预期额度 =
        交易行业总数 * 单品种最大亏损预期额度 * 亏损范围系数
    const 全交易最大亏损额度 = 交易行业总数 * 单品种最大亏损预期额度

    const 持仓盈亏合计 = reduce(
        (val: number, 品种: type_品种) => {
            return val + (品种.持仓盈利 || 0)
        },
        0,
        全部品种
    )

    // 计算
    const 添加初始可持仓手数 = map((品种: type_品种) => {
        const 行业品种数 = group行业[品种.行业].length
        const 初始可持仓额度 =
            行业品种数 === 1
                ? (单行业初始可持仓额度 / 行业品种数) * 0.8
                : (单行业初始可持仓额度 / 行业品种数) * 1
        const 初始持仓手数 =
            行业品种数 === 1
                ? Math.round(初始可持仓额度 / 品种.一手保证金)
                : Math.round(初始可持仓额度 / 品种.一手保证金)
        const 初始持仓真实额度 = 初始持仓手数 * 品种.一手保证金

        const 一补可持仓真实额度 = 初始持仓真实额度 * (1 + 每次补仓系数)
        const 一补持仓手数 = Math.ceil(一补可持仓真实额度 / 品种.一手保证金)

        const 二补可持仓真实额度 = 一补可持仓真实额度 * (1 + 每次补仓系数)
        let 二补持仓手数 = Math.ceil(二补可持仓真实额度 / 品种.一手保证金)

        if (二补持仓手数 === 一补持仓手数) {
            二补持仓手数 += 1
        }

        // 价格 1000 一手 1 手数 1 保证金比例 0.2 保证金 1000 * 1 * 1 * 0.2 = 200
        // 跌一块 持仓金额： 1手 * 1块 = 1： 200 - 1 = 199
        // 200 亏损 68%， -136 跌136块： 1000 - 136 = 864
        // ((1 - 可补仓亏损边界 * 保证金比例) * 持仓价格) = 一亏补价格

        const 一亏补价格 = 品种.持仓均价
            ? (1 - 可补仓亏损边界 * 品种.保证金比例) * 品种.持仓均价
            : 0

        const 一亏补当前亏损 =
            品种.持仓均价 && 品种.持仓手数
                ? 可补仓亏损边界 *
                  品种.保证金比例 *
                  品种.一手手数 *
                  品种.持仓均价 *
                  品种.持仓手数
                : 0

        const 一亏补后均价 =
            品种.持仓手数 && 品种.持仓均价
                ? (品种.持仓均价 * 品种.持仓手数 +
                      一亏补价格 * (一补持仓手数 - 品种.持仓手数)) /
                  一补持仓手数
                : 0

        const 二亏补价格 = 品种.持仓均价
            ? (1 - 可补仓亏损边界 * 2 * 品种.保证金比例) * 品种.持仓均价
            : 0

        const 二亏补当前亏损 = 品种.持仓手数
            ? 一亏补当前亏损 * 2 +
              一亏补当前亏损 * ((一补持仓手数 - 品种.持仓手数) / 品种.持仓手数)
            : 0

        const 二亏补后均价 =
            品种.持仓手数 && 品种.持仓均价
                ? (品种.持仓均价 * 品种.持仓手数 +
                      二亏补价格 * (二补持仓手数 - 品种.持仓手数)) /
                  二补持仓手数
                : 0

        return {
            ...品种,
            初始可持仓额度,
            初始持仓手数,
            初始持仓真实额度,
            一补可持仓真实额度,
            一补持仓手数,
            二补可持仓真实额度,
            二补持仓手数,

            一亏补价格,
            一亏补当前亏损,
            一亏补后均价,
            二亏补价格,
            二亏补当前亏损,
            二亏补后均价,
        }
    })(group行业列表)

    const 全品种初始持仓总额度 = reduce((count: number, 品种: type_品种) => {
        return count + 品种.初始持仓真实额度
    }, 0)(添加初始可持仓手数)

    const 全品种一补持仓总额度 = reduce((count: number, 品种: type_品种) => {
        return count + 品种.一补可持仓真实额度
    }, 0)(添加初始可持仓手数)

    const 全品种二补持仓总额度 = reduce((count: number, 品种: type_品种) => {
        return count + 品种.二补可持仓真实额度
    }, 0)(添加初始可持仓手数)

    const 交易品种 = 添加初始可持仓手数

    const handle加载品种详情数据 = async () => {
        const rv: any[] = []
        const 数据源 = 全部品种

        for (let i = 0; i < 数据源.length; i++) {
            const 品种 = 数据源[i]
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

        localStorage.setItem(品种详情数据KEY, JSON.stringify(rv))
        set全部品种(rv)
    }

    const handle加载持仓品种详情数据 = async (品种列表: type_品种[]) => {
        const rv: any[] = []

        for (let i = 0; i < 品种列表.length; i++) {
            const 品种 = 品种列表[i]
            const 品种基础 = 全品种基础信息[品种.代码]
            const 合约 = `${品种.代码}${品种基础.持仓合约}`

            const 单品种日数据: type_单品种日数[] = await 单品种日数据获取(合约)
            const 持仓合约一日数据 = 单品种日数据[单品种日数据.length - 1]

            const 持仓合约当前价格 = 持仓合约一日数据.c
            const 持仓合约一手保证金 =
                持仓合约当前价格 * 品种.一手手数 * 品种.保证金比例
            const 持仓合约 = 品种基础.持仓合约
            const 持仓手数 = 品种基础.持仓手数
            const 持仓方向 = 品种基础.持仓方向
            const 持仓均价 = 品种基础.持仓均价

            // const 一补亏额度 =
            // const 一补亏价差 = 0

            const 持仓盈利 =
                持仓手数 && 持仓均价
                    ? 持仓方向 === '多'
                        ? (持仓合约当前价格 - 持仓均价) *
                          品种.一手手数 *
                          持仓手数
                        : (持仓均价 - 持仓合约当前价格) *
                          品种.一手手数 *
                          持仓手数
                    : 0

            rv.push({
                ...品种,
                持仓合约一日数据,
                持仓合约一手保证金,
                持仓合约,
                持仓手数,
                持仓方向,
                持仓均价,
                持仓盈利,
            })
        }

        const 新品种列表 = map((品种: type_品种) => {
            const 匹配新品种 = find((新品种: type_品种) => {
                return 新品种.代码 === 品种.代码
            }, rv)

            return 匹配新品种 || 品种
        }, 全部品种)

        localStorage.setItem(品种详情数据KEY, JSON.stringify(新品种列表))
        set全部品种(新品种列表)
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <品种筛选
                {...{
                    全部品种,
                    可交易品种,
                    不可交易品种,
                    未手动过滤品种,
                    手动过滤品种,
                    杠杆正常品种,
                    杠杆过低品种,
                    沉淀资金正常品种,
                    沉淀资金过低品种,
                    保证金正常品种,
                    保证金过高品种,
                    老品种列表,
                    新品种列表,
                    全历史波幅正常列表,
                    全历史波幅过低列表,
                    年限5历史波幅正常列表,
                    年限5历史波幅过低列表,
                    group行业列表,
                    handle加载品种详情数据,
                }}
            />

            <辅助决策
                {...{
                    总投资金,
                    可持仓资金,
                    交易行业总数,
                    交易品种,
                    单行业初始可持仓额度,
                    每次补仓额度,
                    第一补仓后额度,
                    第二次补仓后额度,
                    最大可持仓额度,
                    第一次补仓亏损临界额度,
                    第二次补仓亏损临界额度,

                    单品种最大亏损下限额度,
                    单品种最大亏损预期额度,
                    全交易最大亏损下限额度,
                    全交易最大亏损预期额度,
                    全交易最大亏损额度,
                }}
            />

            <实盘交易
                {...{
                    交易品种,
                    全品种初始持仓总额度,
                    全品种一补持仓总额度,
                    全品种二补持仓总额度,
                    持仓盈亏合计,
                    handle加载持仓品种详情数据,
                }}
            />
        </Box>
    )
}

export default 流程
