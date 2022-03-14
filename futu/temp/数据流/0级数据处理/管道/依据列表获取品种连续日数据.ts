import { match, replace } from 'ramda'
import { type_基础品种信息 } from 'src/数据流/type'

const 依据列表获取品种连续日数据 = async (品种列表: type_基础品种信息[]) => {
    let 结果 = {}

    for (let 下标 = 0; 下标 < 品种列表.length; 下标++) {
        const 品种 = 品种列表[下标]

        const 请求 = await fetch(`/ri?symbol=${品种.Code}0`)
        const 数据 = await 请求.text()

        await new Promise(resolve => setTimeout(resolve, 1000 * 2))

        const 分时列表字符串_特殊 = match(/\[.*\]/)(数据)

        const 分时列表字符串 = 分时列表字符串_特殊.length
            ? replace('\\', '')(分时列表字符串_特殊[0])
            : ''

        try {
            结果[品种.Code] = JSON.parse(分时列表字符串)
        } catch (error) {
            console.error(error)
        }
    }

    return 结果
}

export default 依据列表获取品种连续日数据
