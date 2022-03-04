import {
    addIndex,
    compose,
    dropLast,
    equals,
    filter,
    find,
    map,
    match,
    prop,
    sort,
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

export const 最大持仓金额 = 30000 // 23000

export const 回撤止损比例 = 0.03 // 3%

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
    return (1 / 保证金比例).toFixed(2)
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

    // 保证金排行 1
    const sort_按保证金 = sort((a: type_品种信息, b: type_品种信息) => {
        return a.保证金比例 - b.保证金比例
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < sort_按保证金.length - 1) {
            分数 += 1
        }
    })(sort_按保证金)

    // 历史波幅 1
    const 历史波幅列表 = sort((a: type_品种信息, b: type_品种信息) => {
        return b.历史波幅 - a.历史波幅
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < 历史波幅列表.length - 2) {
            分数 += 1
        }
    })(历史波幅列表)

    // 预期波动 2
    const sort_预期波动 = sort((a: type_品种信息, b: type_品种信息) => {
        return Math.abs(b.预期波动) - Math.abs(a.预期波动)
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < sort_预期波动.length - 2) {
            分数 += 2
        }
    })(sort_预期波动)

    // 价格增减比例 1
    const sort_价格增减比例 = sort((a: type_品种信息, b: type_品种信息) => {
        return b.价格增减比例 - a.价格增减比例
    })(fixList)

    addIndex(map)((item: any, idx: number) => {
        if (item.Code === data.Code && idx < sort_价格增减比例.length - 2) {
            分数 += 1
        }
    })(sort_价格增减比例)

    // 整体趋势 1
    const 预期趋势统计 = compose(
        (list: any) => {
            if (list.length) {
                if (list.length > fixList.length / 2) {
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
        分数 += 1
    }

    // 盈利状态 3

    return 分数
}

export const get_品种基础信息列表 = () => {
    const list = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(ftText)

    const fixList = map((item: string) => {
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

            预期波动: parseInt(
                (
                    ((预期列表[预期列表.length - 1] - 价格列表[0]) /
                        价格列表[0]) *
                    基准比率 *
                    100
                ).toFixed(0)
            ),

            预期趋势:
                预期列表[预期列表.length - 1] > 价格列表[价格列表.length - 1]
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

    const 关注列表 = filter((item: type_品种信息) => {
        return item.关注度 > 0
    })(fixList)

    const fix2List = map((item: type_品种信息) => {
        return {
            ...item,
            评分: cal_评分(item, 关注列表),
        }
    })(关注列表)

    const 评分排序列表 = sort((a: type_品种信息, b: type_品种信息) => {
        return b.评分 - a.评分
    })(fix2List)

    const fix3List: type_品种信息[] = addIndex(map)(
        (item: any, idx: number) => {
            const sea = [2, 2, 2, 1.5, 1.5, 0, 0]
            const 品种最大持仓金额 = 最大持仓金额 * sea[idx]

            return {
                ...item,
                最大持仓金额: parseInt(品种最大持仓金额.toFixed(0)),
                最大持仓数: cal_最大持仓手数(item.一手保证金, 品种最大持仓金额),
            }
        }
    )(评分排序列表)

    console.log('fixList', JSON.stringify(fix3List, null, 2))

    return fix3List
}
