// import 依据列表获取品种连续分时数据 from 'src/数据流/0级数据处理/管道/依据列表获取品种连续分时数据'
// import 依据列表获取品种连续日数据 from 'src/数据流/0级数据处理/管道/依据列表获取品种连续日数据'
// import 下载零级数据 from 'src/数据流/0级数据处理/管道/下载0级数据'
// import 品种列表数据源 from 'src/数据流/0级数据处理/数据/品种列表数据源'
// import 当前关注品种列表 from 'src/数据流/0级数据处理/数据/当前关注品种列表'

import { type_基础品种信息 } from 'src/数据流/type'

export interface type_0级数据流程输出 {
    品种信息: type_基础品种信息[]
}

export interface 类型_零级数据流程_参数 {
    下载品种连续日数据: boolean
}

const 一阶_请求全品种数据 = async () => {
    try {
        const 请求 = await fetch('/quan_ping_zhong_shu_ju', {
            method: 'POST',
            body: JSON.stringify({ new: true }),
        })

        const 全品种数据 = await 请求.json()

        if (全品种数据.ok) {
            return 全品种数据.data
        }

        throw new Error('获取全品种数据异常！')
    } catch (error) {
        console.error(error)
    }
}

const 零级数据流程 = async () => {
    // const 全品种列表: type_基础品种信息[] =
    //     依据数据源文本拆解品种信息(品种列表数据源)
    // if (参数.下载品种连续日数据) {
    //     const 品种连续日数据 = await 依据列表获取品种连续日数据(全品种列表)
    //     下载零级数据('品种连续日数据', 品种连续日数据)
    // }
    // const 品种连续分时数据 = 依据列表获取品种连续分时数据(全品种列表)
    // 下载零级数据('品种连续分时数据', 品种连续分时数据)

    const 全品种数据 = await 一阶_请求全品种数据()
    console.log('quan_ping_zhong_shu_ju', 全品种数据)
}

export default 零级数据流程
