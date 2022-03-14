import { type_1级数据流程输出 } from 'src/数据流/1级数据处理/流程/1级数据流程'
import {
    type_2级数据流程输出,
    type_基础品种信息_二级,
} from 'src/数据流/2级数据处理/流程/2级数据流程'

export interface type_基础品种信息 {
    Code: string
    name: string
    rate: number
}

export interface type_印记_一级 {
    一级数据流程输出: type_1级数据流程输出
}

export interface type_印记_二级 extends type_印记_一级 {
    一级数据流程输出: type_1级数据流程输出
    二级数据流程输出: type_2级数据流程输出
}

export interface type_基础品种信息_三级 extends type_基础品种信息_二级 {
    主力分时列表: any[]
    最新主力价格: number
    一手单位: number
    一手保证金金额: number
}
export interface type_3级数据流程输出 {
    品种列表: type_基础品种信息_三级[]
}

export interface type_印记_三级 extends type_印记_二级 {
    一级数据流程输出: type_1级数据流程输出
    二级数据流程输出: type_2级数据流程输出
    三级数据流程输出: type_3级数据流程输出
}

export enum 不合格原因 {
    无 = '无',
    保证金比例过高 = '保证金比例过高',
    无法交易 = '无法交易',
    垃圾品种 = '垃圾品种',
    新品种 = '新品种',
    保证金额度过高 = '保证金额度过高',
    同类品种 = '同类品种',
}
