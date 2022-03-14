import { dropLast, map, match } from 'ramda'

import 品种列表数据源 from './品种列表数据源'

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
        }
    })(数据字符串)

    return 数据
}

export interface type_基础品种信息 {
    代码: string
    名称: string
    保证金比例: number
}

export default 获取全品种列表
