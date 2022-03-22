import { dropLast, filter, find, includes, map, match } from 'ramda'

import 品种列表数据源 from './品种列表数据源'

import 无法交易品种列表, {
    type_无法交易品种,
} from '../../数据/无法交易品种列表'
import 垃圾品种列表, { type_垃圾品种 } from '../../数据/垃圾品种列表'
import 同类品种列表, { type_同类品种 } from '../../数据/同类品种列表'
import 新品种列表, { type_新品种 } from '../../数据/新品种列表'
import 各品种一手单位 from '../../数据/各品种一手单位'

const 获取全品种列表 = () => {
    const 数据字符串 = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(品种列表数据源)

    const 数据: type_基础品种信息[] = map((item: string) => {
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
            一手单位: 各品种一手单位[upCode]?.一手单位 || 0,
            一手保证金: 0,
            关注合约最新价格: 0,
            最新主力价格: 0,
            远近合约差价: 0,
            历史价位: 0,
        }
    })(数据字符串)

    const 过滤后品种 = filter((品种: type_基础品种信息) => {
        const 存在于无法交易列表 = find((无法交易品种: type_无法交易品种) => {
            return 无法交易品种.Code === 品种.代码
        })(无法交易品种列表)

        if (存在于无法交易列表) {
            return false
        }

        const 存在于垃圾品种列表 = find((垃圾品种: type_垃圾品种) => {
            return 垃圾品种.Code === 品种.代码
        })(垃圾品种列表)

        if (存在于垃圾品种列表) {
            return false
        }

        const 存在于同类品种列表 = find((同类品种: type_同类品种) => {
            return 同类品种.Code === 品种.代码
        })(同类品种列表)

        if (存在于同类品种列表) {
            return false
        }

        const 存在于新品种列表 = find((新品种: type_新品种) => {
            return 新品种.Code === 品种.代码
        })(新品种列表)

        if (存在于新品种列表) {
            return false
        }

        return true
    })(数据)

    // 过滤保证金比例过高的品种
    const 过滤保证金比例过高的品种列表 = filter((品种: type_基础品种信息) => {
        return 品种.保证金比例 < 25
    })(过滤后品种)

    return 过滤保证金比例过高的品种列表
}

export interface type_基础品种信息 {
    代码: string
    名称: string
    保证金比例: number
    杠杆: number
    一手单位: number
    一手保证金: number
    最新主力价格: number
    关注合约最新价格: number
    远近合约差价: number
    历史价位: number
    关注合约?: string
    指定合约价位?: number
    可持仓手数?: number
    可持仓金额?: number
}

export default 获取全品种列表
