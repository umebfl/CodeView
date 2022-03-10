import { clone } from 'ramda'
import 品种列表数据源 from 'src/数据流/1级数据处理/数据/品种列表数据源'
import 依据数据源文本拆解品种信息, {
    type_基础品种信息,
} from 'src/数据流/1级数据处理/管道/依据数据源文本拆解品种信息'
import { type_印记_一级 } from 'src/数据流/type'

// 获取基础品种信息
export interface type_1级数据流程输出 {
    品种信息: type_基础品种信息[]
}

export interface type_1级数据流程结果 extends type_1级数据流程输出 {
    印记: type_印记_一级
}

const 流程 = (): type_1级数据流程结果 => {
    const 品种信息: type_基础品种信息[] =
        依据数据源文本拆解品种信息(品种列表数据源)

    return {
        品种信息,
        印记: {
            一级数据流程输出: { 品种信息: clone(品种信息) },
        },
    }
}

export default 流程
