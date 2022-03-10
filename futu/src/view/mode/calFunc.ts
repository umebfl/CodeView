import {
    addIndex,
    compose,
    dropLast,
    equals,
    filter,
    propEq,
    find,
    map,
    match,
    prop,
    sort,
    reduce,
} from 'ramda'
import ftText from 'src/数据/品种-比例'
import 当前数据 from 'src/数据/当前'
import {
    type_品种信息,
    价格波幅类型,
    品种信息_初始化,
    预期方向类型,
} from './type'
import moment from 'moment'

moment.locale('zh-cn')

export type 品种价格数据类型 = [当前价格: number, 三月价格预期: number]

export const 最大持仓金额 = 25000 // 23000

export const 回撤止损比例 = 0.03 // 3%

const 最大持仓品种数 = 5

export const cal_计算持仓盈亏 = (
    方向: string,
    持仓价: number,
    当前价: number,
    一手单位: number,
    持仓手数: number
) => {
    return 方向 === '看多'
        ? (当前价 - 持仓价) * 一手单位 * 持仓手数
        : (持仓价 - 当前价) * 一手单位 * 持仓手数
}

export const cal_计算杠杆 = (保证金比例: number) => {
    return parseFloat((1 / 保证金比例).toFixed(2))
}

export const cal_一手保证金 = (
    当前价格: number,
    一手单位: number,
    保证金比例: number
) => {
    return 当前价格 * 一手单位 * 保证金比例
}

export const cal_最大持仓手数 = (
    一手保证金: number,
    品种最大持仓金额: number
) => {
    return Math.floor(品种最大持仓金额 / 一手保证金)
}

export const cal_持仓金额 = (一手保证金: number, 持仓手数: number) => {
    return 一手保证金 * 持仓手数
}

export const cal_持仓剩余天数 = (合约: string) => {
    return moment(`20${合约}01`, true).diff(moment(), 'd')
}

export const cal_评分 = (data: type_品种信息, fixList: type_品种信息[]) => {
    let 分数 = 0

    if (data.持仓手数 === 0 || data.预期列表.length === 0) {
        return 0
    }

    // 保证金排行 1
    const sort_按保证金 = sort((a: type_品种信息, b: type_品种信息) => {
        return a.保证金比例 - b.保证金比例
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 最大持仓品种数) {
            分数 += 1
        }
    })(sort_按保证金)

    // 历史波幅 1
    const 历史波幅列表 = sort((a: type_品种信息, b: type_品种信息) => {
        const a历史波幅 = a.历史波幅 || 0
        const b历史波幅 = b.历史波幅 || 0

        return b历史波幅 - a历史波幅
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 最大持仓品种数) {
            console.log(item.Code, '历史波幅+1')
            分数 += 2
        }
    })(历史波幅列表)

    // 预期波动 2
    const sort_预期波动 = sort((a: type_品种信息, b: type_品种信息) => {
        const a预期波动 = a.预期波动 === null ? 0 : a.预期波动
        const b预期波动 = b.预期波动 === null ? 0 : b.预期波动

        return Math.abs(b预期波动) - Math.abs(a预期波动)
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 最大持仓品种数) {
            console.log(item.Code, '预期波动+2')
            分数 += 2
        }
    })(sort_预期波动)

    // 价格增减比例 1
    const sort_价格增减比例 = sort((a: type_品种信息, b: type_品种信息) => {
        const a价格增减比例 = a.价格增减比例 || 0
        const b价格增减比例 = b.价格增减比例 || 0

        return b价格增减比例 - a价格增减比例
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 最大持仓品种数) {
            分数 += 1
            console.log(item.Code, '价格增减比例+1')
        }
    })(sort_价格增减比例)

    // 整体趋势 1
    const 关注列表 = filter(
        (item: type_品种信息) => item.预期趋势 !== 价格波幅类型.平
    )(fixList)

    const 预期趋势统计 = compose(
        (list: any) => {
            if (list.length) {
                if (list.length > 关注列表.length / 2) {
                    return 价格波幅类型.多
                }
                return 价格波幅类型.空
            }
            return 价格波幅类型.平
        },
        filter(item => item === 价格波幅类型.多),
        map(prop('预期趋势'))
    )(fixList)

    if (data.预期趋势 === 预期趋势统计) {
        console.log(data.Code, '预期趋势+1')
        分数 += 1
    }

    // 盈利状态 3
    const sort_持仓盈亏 = sort((a: type_品种信息, b: type_品种信息) => {
        const a持仓盈亏 = a.持仓盈亏 || 0
        const b持仓盈亏 = b.持仓盈亏 || 0

        return b持仓盈亏 - a持仓盈亏
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 最大持仓品种数) {
            分数 += 1
            console.log(item.Code, '持仓盈亏排序+1')
        }
    })(sort_持仓盈亏)

    if (data.持仓盈亏 < 0) {
        console.log(data.Code, '持仓盈亏-1')
        分数 -= 1
    } else {
        分数 += 1
        console.log(data.Code, '持仓盈亏+1')
    }

    return 分数
}

export const get_品种基础信息列表 = () => {
    const list = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(ftText)

    const 全品种列表 = map((item: string) => {
        const rateStr = match(/\d{1,2}%/)(item)
        const rate = parseInt(dropLast(1)(rateStr[0]))

        const code = match(/[a-zA-Z]{1,2}/)(item)[0]
        const upCode = code.toUpperCase()
        const name = item.substr(0, item.indexOf(code)).trim()

        const 当前 =
            find((payload: type_品种信息) => payload.Code === upCode)(
                当前数据
            ) || 品种信息_初始化

        const 保证金比例 = parseFloat((rate / 100).toFixed(2))
        const 基准比率 = 0.15 / 保证金比例

        const 价格列表 = 当前.价格列表
        const 价格波幅统计 = addIndex(map)((item, idx, list): number => {
            const nlist = list as number[]
            if (idx === 0) {
                return 0
            }
            const base = nlist[0]
            const 波幅 = (item as number) - base
            const 波幅比例: number = parseFloat(
                ((波幅 / nlist[0]) * 基准比率).toFixed(6)
            )

            return 波幅比例
        })(价格列表) as number[]

        const 预期列表 = 当前.预期列表
        const 当前价格 = 价格列表[价格列表.length - 1]
        const 一手保证金 = cal_一手保证金(当前价格, 当前.一手单位, 保证金比例)
        const 持仓方向 =
            当前.预期列表[当前.预期列表.length - 1] >
            当前.价格列表[当前.价格列表.length - 1]
                ? 预期方向类型.看多
                : 预期方向类型.看空

        return {
            ...品种信息_初始化,
            ...当前,
            Code: upCode,
            名称: name,
            // 更新比例
            保证金比例,

            一手保证金,
            品种: `${upCode}${当前.主力合约}`,
            杠杆: cal_计算杠杆(保证金比例),
            沉淀资金: parseInt(
                ((当前价格 * 当前.持仓量) / 100000000).toFixed(0)
            ),
            持仓盈亏: cal_计算持仓盈亏(
                持仓方向,
                当前.持仓单价,
                当前价格,
                当前.一手单位,
                当前.持仓手数
            ),
            持仓金额: cal_持仓金额(一手保证金, 当前.持仓手数),
            持仓方向,
            风险度: 0,

            合约剩余天数: 当前.持仓合约.length
                ? cal_持仓剩余天数(当前.持仓合约)
                : 0,
            推荐合约: [
                moment()
                    .add(30 * 6, 'days')
                    .format('YYMM'),
                moment()
                    .add(30 * 9, 'days')
                    .format('YYMM'),
            ],

            // 0.2 -> 0.1基准 => 0.5
            基准比率,

            历史波幅:
                ((当前.历史10年最高 - 当前.历史10年最低) / 当前.历史10年最低) *
                基准比率 *
                100,

            当前价格,

            当前价位: parseInt(
                ((当前价格 / 当前.历史10年最高) * 100).toFixed(0)
            ),

            价格列表,
            价格波幅统计,
            价格波幅趋势:
                价格列表[0] < 价格列表[价格列表.length - 1]
                    ? 价格波幅类型.多
                    : 价格列表[0] > 价格列表[价格列表.length - 1]
                    ? 价格波幅类型.空
                    : 价格波幅类型.平,
            价格增减比例:
                ((价格列表[价格列表.length - 1] - 价格列表[0]) / 价格列表[0]) *
                基准比率 *
                100,

            预期波动:
                预期列表.length && 价格列表.length
                    ? parseInt(
                          (
                              ((预期列表[预期列表.length - 1] - 价格列表[0]) /
                                  价格列表[0]) *
                              基准比率 *
                              100
                          ).toFixed(0)
                      )
                    : 0,

            预期趋势:
                预期列表.length === 0 || 价格列表.length === 0
                    ? 价格波幅类型.平
                    : 预期列表[预期列表.length - 1] >
                      价格列表[价格列表.length - 1]
                    ? 价格波幅类型.多
                    : 价格波幅类型.空,

            回撤半平点: 当前.持仓手数
                ? 持仓方向 === 预期方向类型.看多
                    ? 当前.持仓单价 * (1 - 回撤止损比例)
                    : 当前.持仓单价 * (1 + 回撤止损比例)
                : 0,

            回撤全平点: 当前.持仓手数
                ? 持仓方向 === 预期方向类型.看多
                    ? 当前.持仓单价 * (1 - 回撤止损比例 * 2)
                    : 当前.持仓单价 * (1 + 回撤止损比例 * 2)
                : 0,
        }
    })(list)

    const 计算评分列表 = map((item: type_品种信息) => {
        return {
            ...item,
            评分: cal_评分(item, 全品种列表),
        }
    })(全品种列表)

    const 评分排序列表 = sort((a: type_品种信息, b: type_品种信息) => {
        return b.评分 - a.评分
    })(计算评分列表)

    const 评分合计 = reduce((count: number, item: type_品种信息) => {
        console.log(item, item.评分)
        return count + item.评分
    }, 0)(评分排序列表)

    const 有评分品种列表 = filter((item: type_品种信息) => item.评分 > 0)(
        评分排序列表
    )

    const 持仓信息列表: type_品种信息[] = addIndex(map)(
        (item: any, idx: number) => {
            // const sea = [
            //     // 0
            //     2,
            //     // 1
            //     2,
            //     // 2
            //     2,
            //     // 3
            //     1.5,
            //     // 4
            //     1.5,
            //     // 5
            //     1,
            //     // 6
            //     0,
            //     // 7
            //     0,
            // ]
            let rate = 2

            // 如果分数低于平均值的一半，就淘汰
            if (item.评分 < (评分合计 / 有评分品种列表.length) * 0.5) {
                rate = 0
            }

            const 品种最大持仓金额 = 最大持仓金额 * rate

            return {
                ...item,
                最大持仓金额: parseInt(品种最大持仓金额.toFixed(0)),
                最大持仓数: cal_最大持仓手数(item.一手保证金, 品种最大持仓金额),
            }
        }
    )(评分排序列表)

    // 过滤

    const 过滤杠杆过低的品种列表 = filter(
        (item: type_品种信息) => item.杠杆 > 4
    )(持仓信息列表)

    const 过滤关注度过低的品种列表 = filter(
        (item: type_品种信息) => item.关注度 > 0
    )(过滤杠杆过低的品种列表)

    const 过滤新品种列表 = filter((item: type_品种信息) => !item.新品种)(
        过滤关注度过低的品种列表
    )

    const 过滤保证金比例过高列表 = filter(
        (item: type_品种信息) => item.一手保证金 < 17000
    )(过滤新品种列表)

    const 过滤历史波幅过低列表 = filter(
        (item: type_品种信息) => item.历史波幅 > 120
    )(过滤保证金比例过高列表)

    const 未过滤加分列表 = map((item: type_品种信息) => {
        const 存在 = find(propEq('Code', item.Code))(过滤历史波幅过低列表)

        return {
            ...item,
            评分: 存在 ? item.评分 + 1 : item.评分,
        }
    })(持仓信息列表)

    const 按评分排序全品种列表 = sort((a: type_品种信息, b: type_品种信息) => {
        return b.评分 - a.评分
    })(未过滤加分列表)

    return [过滤历史波幅过低列表, 按评分排序全品种列表]
}
function reducer(arg0: (item: type_品种信息) => any) {
    throw new Error('Function not implemented.')
}
