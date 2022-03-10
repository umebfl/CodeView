import { dropLast, map, match } from 'ramda'

const 依据数据源文本拆解品种信息 = (txt: string): type_基础品种信息[] => {
    const list = match(/.*[a-zA-Z]{1,2} ?[:：] ?\d\d%/g)(txt)

    const 全品种列表: type_基础品种信息[] = map((item: string) => {
        const rateStr = match(/\d{1,2}%/)(item)
        const rate = parseInt(dropLast(1)(rateStr[0]))

        const code = match(/[a-zA-Z]{1,2}/)(item)[0]
        const upCode = code.toUpperCase()
        const name = item.substr(0, item.indexOf(code)).trim()

        return {
            Code: upCode,
            name,
            rate,
        }
    })(list)

    return 全品种列表
}

export interface type_基础品种信息 {
    Code: string
    name: string
    rate: number
}

export default 依据数据源文本拆解品种信息
