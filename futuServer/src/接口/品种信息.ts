import {
    compose,
    dropLast,
    filter,
    forEach,
    isEmpty,
    keys,
    map,
    match,
    max,
    pair,
    replace,
    sort,
} from 'ramda'
import fetch from 'node-fetch'
import moment from 'moment'
import fs from 'fs'

import 获取全品种列表, { type_基础品种信息 } from '../管道/品种信息/全品种列表'
import {
    全品种连续合约分时数据获取,
    全品种日数据获取,
} from '../管道/新浪数据/新浪数据'

import 品种类型 from '../数据/品种类型'
import 关注品种 from '../数据/关注品种'

const 更新间隔秒数 = 5
const 可用资金 = 310000
const 总投入 = 可用资金 * 0.9

let 最后更新时间: moment.Moment | null = null
let 连续合约分时数据存储 = {}
let 指定合约分时数据存储 = {}

let 连续合约日数据存储 = {}

const 下载数据 = async () => {
    const 全品种列表 = 获取全品种列表()

    const 关注品种信息列表 = map((品种: type_基础品种信息) => {
        return {
            ...品种,
            ...(关注品种[品种.代码] || {}),
        }
    })(全品种列表)

    const 关注品种列表 = filter((品种: type_基础品种信息) => {
        return !!品种.关注合约
    })(关注品种信息列表)

    连续合约日数据存储 = await 全品种日数据获取(关注品种列表)
    连续合约分时数据存储 = await 全品种连续合约分时数据获取(
        关注品种列表,
        '连续'
    )

    指定合约分时数据存储 = await 全品种连续合约分时数据获取(
        关注品种列表,
        '指定'
    )
}

下载数据()

setInterval(() => {
    下载数据()
}, 1000 * 60 * 2)

export default (app: any) => {
    // 最新品种数据
    app.get('/zui_xin_ping_zhong_shu_ju', async (req: any, res: any) => {
        const 当前时间 = moment()
        const 全品种列表 = 获取全品种列表()

        const 关注品种信息列表 = map((品种: type_基础品种信息) => {
            return {
                ...品种,
                ...(关注品种[品种.代码] || {}),
            }
        })(全品种列表)

        const 关注品种列表 = filter((品种: type_基础品种信息) => {
            return !!品种.关注合约
        })(关注品种信息列表)
        console.log(关注品种列表)

        const 可持仓品种列表 = filter((品种: type_基础品种信息) => {
            return 品种.关注类型 === '可持仓'
        })(关注品种列表)

        const 参考品种列表 = filter((品种: type_基础品种信息) => {
            return 品种.关注类型 === '参考'
        })(关注品种列表)

        if (
            最后更新时间 === null ||
            当前时间.diff(最后更新时间, 'seconds') > 更新间隔秒数
        ) {
            // await new Promise(resolve => setTimeout(resolve, 1000 * 10))
            // await 下载数据()
            // 获取全部品种的连续合约日数据
            // 连续合约日数据存储 = 全品种日数据获取(全品种列表)
            // 连续合约日数据存储 = await 全品种日数据获取(关注品种信息列表)
            // 连续合约分时数据存储 = await 全品种连续合约分时数据获取(
            //     关注品种信息列表,
            //     '连续'
            // )
            // 指定合约分时数据存储 = await 全品种连续合约分时数据获取(
            //     关注品种列表,
            //     '指定'
            // )
            // 获取全部品种的主力合约日数据
            // 获取关注品种的持仓合约日数据
        } else {
            // 如果未超时, 使用缓存
            最后更新时间 = 当前时间
        }

        if (
            isEmpty(连续合约分时数据存储) ||
            isEmpty(指定合约分时数据存储) ||
            isEmpty(连续合约日数据存储)
        ) {
            return {
                状态: false,
                数据: '缓存数据为空',
            }
        } else {
            // 拼接最新价格到日数据
            forEach((key: string) => {
                const 日数据: any[] = 连续合约日数据存储[key]
                const 分时数据: any[] = 连续合约分时数据存储[key]
                const 最新价格 = 分时数据[分时数据.length - 1][1]
                const 最后日数据 = 日数据[日数据.length - 1]
                const 当前日期 = moment().format('YYYY-MM-DD')

                // 如果不存在当日数据
                if (当前日期 !== 最后日数据.d) {
                    连续合约日数据存储[key] = [
                        ...日数据,
                        {
                            c: 最新价格,
                            d: 当前日期,
                            h: 最新价格,
                            l: 最新价格,
                            o: 最新价格,
                            p: 0,
                            s: 最新价格,
                            v: 0,
                        },
                    ]
                }
            })(keys(连续合约日数据存储))
        }

        // 依据数据生成列表数据

        // 获取最新价格
        const 全品种列表_最新价格 = map((品种: type_基础品种信息) => {
            const 品种分时数据 = 连续合约分时数据存储[品种.代码]
            console.log(品种.代码, 品种分时数据?.length)

            if (品种分时数据.length) {
                const 最新主力价格 = parseFloat(
                    品种分时数据[品种分时数据.length - 1][1]
                )

                const 一手保证金 =
                    最新主力价格 * 品种.一手单位 * (品种.保证金比例 / 100)

                return {
                    ...品种,
                    最新主力价格,
                    一手保证金,
                }
            }

            return {
                ...品种,
                最新主力价格: 0,
                杠杆: parseFloat((1 / 品种.保证金比例).toFixed(2)),
            }
        })(关注品种列表)

        // 加工 -指定合约价格
        const 指定合约列表 = map((品种: type_基础品种信息) => {
            const 分时数据 = 指定合约分时数据存储[品种.代码]

            if (分时数据) {
                const 关注合约最新价格 = parseFloat(
                    分时数据[分时数据.length - 1][1]
                )

                const 一手保证金 =
                    关注合约最新价格 * 品种.一手单位 * (品种.保证金比例 / 100)

                const 远近合约差价 = 关注合约最新价格 - 品种.最新主力价格
                const 远近合约差价比例 = parseFloat(
                    ((远近合约差价 / 品种.最新主力价格) * 100).toFixed(2)
                )

                const 可持仓手数 = Math.floor(
                    总投入 / 可持仓品种列表.length / 一手保证金
                )

                const 可持仓金额 = 可持仓手数 * 一手保证金

                return {
                    ...品种,
                    关注合约最新价格,
                    远近合约差价,
                    远近合约差价比例,
                    可持仓手数,
                    可持仓金额,
                    一手保证金,
                }
            }

            return {
                ...品种,
                关注合约最新价格: 0,
            }
        })(全品种列表_最新价格)

        // 过滤保证金过高的品种
        const 过滤保证金过高的品种列表 = filter((品种: type_基础品种信息) => {
            return 品种.一手保证金 < 1000000
        })(指定合约列表)

        // 加工
        // 获取品种历史最高 最低价格
        const 全品种列表_历史最高最低价格 = map((品种: type_基础品种信息) => {
            const 品种日数据 = 连续合约日数据存储[品种.代码]

            const 全部最高价: number[] = compose(
                filter((数据: number) => 数据 > 0),
                map((数据: any) => {
                    return parseInt(数据.c)
                })
            )(品种日数据)

            const H价格排序 = sort((a: number, b: number) => b - a)(全部最高价)

            const 最高价 = H价格排序[0]
            const 最低价 = H价格排序[H价格排序.length - 1]

            const 指定合约价位 = parseInt(
                (
                    ((品种.关注合约最新价格 - 最低价) / (最高价 - 最低价)) *
                    100
                ).toFixed(0)
            )

            return {
                ...品种,
                最高价,
                最低价,
                历史振幅: parseInt(
                    (((最高价 - 最低价) / 最低价) * 100).toFixed(2)
                ),
                历史价位: parseInt(
                    (
                        ((品种.最新主力价格 - 最低价) / (最高价 - 最低价)) *
                        100
                    ).toFixed(0)
                ),
                指定合约价位,
            }
        })(过滤保证金过高的品种列表)

        // 加工 -
        const 品种类型列表 = map((品种: type_基础品种信息) => {
            return {
                ...品种,
                类型: 品种类型[品种.代码] || '-',
            }
        })(全品种列表_历史最高最低价格)

        res.json({
            状态: true,
            数据: 品种类型列表,
        })
    })

    app.get(
        '/ping_zhong_ri_feng_shi_shu_ju/:code',
        async (req: any, res: any) => {
            const code = req.params.code

            // 读取日数据
            const 连续日数据 = 连续合约日数据存储[code]
            const 连续分时数据 = 连续合约分时数据存储[code]
            const 关注合约分时数据 = 指定合约分时数据存储[code]

            // 读取分时数据
            res.json({
                状态: true,
                数据: {
                    连续日数据,
                    连续分时数据,
                    关注合约分时数据,
                },
            })
        }
    )

    // 全品种列表
    app.get('/quan_ping_zhong_lie_biao', (req: any, res: any) => {
        const 全品种列表 = 获取全品种列表()

        res.json({
            状态: true,
            数据: 全品种列表,
        })
    })

    // 更新指定品种-连续合约到日数据
    app.get('/gen_xin_lian_xu_ri_shu_ju/:code', async (req: any, res: any) => {
        try {
            const 合约 = `${req.params.code}0`
            const 数据缓存 = 连续合约日数据存储[合约]

            if (数据缓存) {
                res.json({
                    状态: true,
                    数据: 数据缓存,
                })
            } else {
                const 请求 = await fetch(
                    `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
                )
                const 数据 = await 请求.text()
                // await new Promise(resolve => setTimeout(resolve, 1000 * 2))
                // console.log(数据)

                const 分时列表字符串_特殊 = match(/\[.*\]/)(数据)

                const 分时列表字符串 = 分时列表字符串_特殊.length
                    ? replace('\\', '')(分时列表字符串_特殊[0])
                    : ''

                const 结果 = JSON.parse(分时列表字符串)

                连续合约日数据存储[合约] = 结果

                res.json({
                    状态: true,
                    数据: 结果,
                })
            }
        } catch (error) {
            console.error(error)
            res.json({
                状态: false,
                数据: '接口异常',
            })
        }
    })
}
