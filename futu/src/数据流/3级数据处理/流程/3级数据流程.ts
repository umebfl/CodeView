import {
    clone,
    compose,
    filter,
    find,
    forEach,
    map,
    match,
    replace,
    split,
    take,
} from 'ramda'
import 二级数据流程, {
    type_2级数据流程输出,
    type_基础品种信息_二级,
} from 'src/数据流/2级数据处理/流程/2级数据流程'
import {
    type_印记_三级,
    type_基础品种信息_三级,
    不合格原因,
} from 'src/数据流/type'
import 各品种一手单位 from 'src/数据流/3级数据处理/数据/各品种一手单位'
import { cal_一手保证金 } from 'src/view/mode/calFunc'

// 获取全部合格品种的当日分时
const 当日分时数据接口 = ''

const 分时存储键 = '全品种当日分时数据'

export interface type_3级数据流程输出 extends type_2级数据流程输出 {
    印记: type_印记_三级
}

const 一阶数据处理_获取当日主力分时 = async (
    品种列表: type_基础品种信息_二级[]
) => {
    const 合格列表 = filter((品种: type_基础品种信息_二级) => 品种.合格状态)(
        品种列表
    )

    const 分时数据字符串 = localStorage.getItem(分时存储键)

    let data = {}

    if (分时数据字符串) {
        data = JSON.parse(分时数据字符串)
    } else {
        for (let i = 0; i < 合格列表.length; i++) {
            const 品种 = 合格列表[i]
            const rv = await fetch(`/dangrifengshi?symbol=${品种.Code}0&type=5`)
            const text = await rv.text()
            await new Promise(resolve => setTimeout(resolve, 500))
            const 分时列表字符串_特殊 = match(/\[.*\]/)(text)

            const 分时列表字符串 = 分时列表字符串_特殊.length
                ? replace('\\', '')(分时列表字符串_特殊[0])
                : ''

            try {
                const 分时列表 = JSON.parse(分时列表字符串)

                data = {
                    ...data,
                    [品种.Code]: 分时列表,
                }
            } catch (error) {
                console.error(error)
            }
        }

        // 存储到localstorage
        localStorage.setItem(分时存储键, JSON.stringify(data))
    }

    const 新品种列表 = map((品种: type_基础品种信息_二级) => {
        const 主力分时列表 = data[品种.Code]

        if (主力分时列表) {
            const 最新主力价格 = parseFloat(
                主力分时列表[主力分时列表.length - 1].c
            )
            const 一手单位 = 各品种一手单位[品种.Code].一手单位

            return {
                ...品种,
                主力分时列表,
                最新主力价格,
                一手单位,
                一手保证金金额: cal_一手保证金(
                    最新主力价格,
                    一手单位,
                    品种.rate / 100
                ),
            }
        }

        return {
            ...品种,
            主力分时列表: [],
            最新主力价格: 0,
            一手单位: 0,
            一手保证金金额: 0,
        }
    })(品种列表)

    return 新品种列表
}

const 二阶数据处理_过滤保证金过高品种列表 = (
    品种列表: type_基础品种信息_三级[]
): type_基础品种信息_三级[] => {
    return map((品种: type_基础品种信息_三级) => {
        const 合格 = 品种.一手保证金金额 < 18000

        return {
            ...品种,
            合格状态: 品种.合格状态 ? 合格 : 品种.合格状态,
            不合格原因: 合格
                ? 品种.不合格原因
                : [...品种.不合格原因, 不合格原因.保证金额度过高],
        }
    })(品种列表)
}

const 流程 = async () => {
    const 二级数据结果 = 二级数据流程()
    const 一阶数据处理结果: type_基础品种信息_三级[] =
        await 一阶数据处理_获取当日主力分时(二级数据结果.品种列表)

    const 二阶数据处理结果 =
        二阶数据处理_过滤保证金过高品种列表(一阶数据处理结果)

    const 三级数据流程输出 = {
        品种列表: 二阶数据处理结果,
    }

    console.log('三级数据流程输出', 三级数据流程输出)

    // const 合格列表 = compose(
    //     map((品种: type_基础品种信息_二级) => {
    //         return {
    //             Code: 品种.Code,
    //             夜盘: true,
    //             交易所: 'sh',
    //             一手单位: 10,
    //         }
    //     }),
    //     filter((品种: type_基础品种信息_二级) => {
    //         return 品种.合格状态
    //     })
    // )(三级数据流程输出.品种列表)

    // console.log(JSON.stringify(合格列表, null, 2))

    return {
        ...三级数据流程输出,
        印记: {
            ...二级数据结果.印记,
            三级数据流程输出: clone(三级数据流程输出),
        },
    }
}

export default 流程
