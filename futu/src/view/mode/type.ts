export enum 关注度 {
    忽略,
    偶尔,
    一般,
    次要,
    重要,
}

export enum 价格波幅类型 {
    多 = '多',
    空 = '空',
    平 = '平',
}

export enum 预期方向类型 {
    看多 = '看多',
    看空 = '看空',
    看平 = '看平',
}

export const 品种信息_初始化: type_品种信息 = {
    名称: '',
    Code: '',
    主力合约: '',
    当前价格: 0,
    保证金比例: 0,
    基准比率: 0,
    一手单位: 0,
    持仓量: 0,
    品类: '',

    持仓合约: '',
    持仓手数: 0,
    持仓单价: 0,
    持仓方向: 预期方向类型.看平,
    持仓金额: 0,
    回撤半平点: 0,
    回撤全平点: 0,
    最大持仓数: 0,
    一手保证金: 0,
    最大持仓金额: 0,

    历史10年最高: 0,
    历史10年最低: 0,
    历史波幅: 0,
    关注度: 关注度.忽略,

    最近12个月价格: [],
    夜盘: false,

    价格列表: [],
    预期列表: [],
    价格波幅统计: [],
    价格波幅趋势: 价格波幅类型.平,
    价格增减比例: 0,
    预期波动: 0,
    预期趋势: 价格波幅类型.平,

    当前价位: 0,
    合约剩余天数: 0,
    推荐合约: [],
    持仓盈亏: 0,
    评分: 0,
    杠杆: 0,
    新品种: false,
}

export interface type_品种信息 {
    Code: string
    名称: string
    保证金比例: number
    基准比率: number
    主力合约: string
    当前价格: number
    一手单位: number
    持仓量: number
    品类: string

    持仓合约: string
    持仓手数: number
    持仓单价: number
    持仓方向: 预期方向类型
    持仓金额: number
    回撤半平点: number
    回撤全平点: number
    最大持仓数: number
    一手保证金: number
    最大持仓金额: number

    历史10年最高: number
    历史10年最低: number
    历史波幅: number
    关注度: 关注度

    最近12个月价格: number[]
    夜盘: boolean

    价格列表: number[]
    预期列表: number[]
    价格波幅统计: number[]
    价格波幅趋势: 价格波幅类型
    价格增减比例: number
    预期波动: number // 百分比
    预期趋势: 价格波幅类型

    当前价位: number
    合约剩余天数: number
    推荐合约: string[]
    持仓盈亏: number
    评分: number
    杠杆: number
    新品种: boolean
}
