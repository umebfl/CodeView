import { 类型_请求结果 } from 'src/类型'

export const 获取全品种列表 = async () => {
    try {
        const 请求 = await fetch('/quan_ping_zhong_lie_biao')
        const 结果 = (await 请求.json()) as 类型_请求结果

        if (!结果.状态) {
            throw new Error('获取全品种列表失败！')
        }

        console.log('全品种列表', 结果.数据)
        return 结果.数据
    } catch (error) {
        alert(error)
    }
}

export const 获取指定品种的连续合约日数据 = async () => {
    try {
        const 请求 = await fetch(`/gen_xin_lian_xu_ri_shu_ju/TA`)
        const 结果 = (await 请求.json()) as 类型_请求结果

        if (!结果.状态) {
            throw new Error('获取指定品种的连续合约日数据失败！')
        }

        console.log('指定品种的连续合约日数据', 结果.数据)
        return 结果.数据
    } catch (error) {
        alert(error)
    }
}

export const 获取最新品种数据 = async () => {
    try {
        const 请求 = await fetch(`/zui_xin_ping_zhong_shu_ju`)
        const 结果 = (await 请求.json()) as 类型_请求结果

        if (!结果.状态) {
            throw new Error('获取最新品种数据失败！')
        }

        console.log('获取最新品种数据', 结果.数据)
        return 结果.数据
    } catch (error) {
        alert(error)
    }
}
