export interface 类型_请求结果 {
    状态: boolean
    数据: any
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
    远近合约差价?: number
    远近合约差价比例: number
    历史价位: number
    关注合约?: string
    指定合约价位: number
    可持仓手数: number
    可持仓金额: number
}
