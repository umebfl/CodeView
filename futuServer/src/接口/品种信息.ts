import { match, replace } from 'ramda'
import fetch from 'node-fetch'
import 获取全品种列表 from '../管道/品种信息/全品种列表'

export default (app: any) => {
    // 全品种列表
    app.get('/quan_ping_zhong_lie_biao', (req: any, res: any) => {
        const 全品种列表 = 获取全品种列表()

        res.json({
            状态: true,
            数据: 全品种列表,
        })
    })

    // 更新指定品种-连续合约到日数据
    app.get('/gen_xin_lian_xu_ri_shu_ju/:code', async (req: any, res: any) => {
        // const code = req.params.code
        console.log('/gen_xin_lian_xu_ri_shu_ju', req)

        const 合约 = `${req.params.code}0`
        console.log(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
        )

        const 请求 = await fetch(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
        )
        const 数据 = await 请求.text()
        // await new Promise(resolve => setTimeout(resolve, 1000 * 2))
        // console.log(数据)

        const 分时列表字符串_特殊 = match(/\[.*\]/)(数据)

        const 分时列表字符串 = 分时列表字符串_特殊.length
            ? replace('\\', '')(分时列表字符串_特殊[0])
            : ''

        const 结果 = JSON.parse(分时列表字符串)

        res.json({
            状态: true,
            数据: 结果,
        })
    })
}
