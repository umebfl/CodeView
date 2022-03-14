// import fs from 'fs'
// import { match, replace } from 'ramda'
// import fetch from 'node-fetch'

// import 依据数据源文本拆解品种信息 from './管道/依据数据源文本拆解品种信息'
// import { type_基础品种信息 } from './类型'

// export interface 类型_日数据 {}

// const 全品种日数据_路径 = './数据/全品种日数据.txt'

// const 写入日数据到本地数据 = (数据: any) => {
//     fs.writeFileSync(全品种日数据_路径, JSON.stringify(数据, null, 2))
// }

// const 依据列表获取品种日数据 = async (品种列表: type_基础品种信息[]) => {
//     let 结果 = {}

//     for (let 下标 = 0; 下标 < 品种列表.length; 下标++) {
//         try {
//             const 品种 = 品种列表[下标]
//             const 合约 = `${品种.Code}0`
//             console.log(合约)
//             const 请求 = await fetch(
//                 `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
//             )
//             const 数据 = await 请求.text()

//             await new Promise(resolve => setTimeout(resolve, 1000 * 2))

//             const 分时列表字符串_特殊 = match(/\[.*\]/)(数据)

//             const 分时列表字符串 = 分时列表字符串_特殊.length
//                 ? replace('\\', '')(分时列表字符串_特殊[0])
//                 : ''

//             结果[品种.Code] = {
//                 ...品种,
//                 日数据: JSON.parse(分时列表字符串),
//             }
//         } catch (error) {
//             console.error(error)
//         }
//     }

//     return 结果
// }

// const 下载远程日数据 = async (全品种列表: type_基础品种信息[]) => {
//     const quan_ping_zhong_shu_ju = await 依据列表获取品种日数据(全品种列表)
//     写入日数据到本地数据(quan_ping_zhong_shu_ju)
//     console.log('日数据写入成功！')

//     return quan_ping_zhong_shu_ju
// }

// const 获取全品种日数据 = async (req: any, res: any) => {
//     console.log('/quan_ping_zhong_shu_ju', req.body)
//     const 新获取 = req.body.new

//     try {
//         let quan_ping_zhong_shu_ju = {}

//         const 全品种列表 = 依据数据源文本拆解品种信息()

//         if (新获取) {
//             console.log('新请求')
//             quan_ping_zhong_shu_ju = 下载远程日数据(全品种列表)
//         } else {
//             console.log('读取数据文本')
//             const 全品种日数据_字符串 = fs
//                 .readFileSync(全品种日数据_路径)
//                 .toString()

//             console.log('全品种日数据_字符串')
//             if (全品种日数据_字符串.length) {
//                 quan_ping_zhong_shu_ju = 全品种日数据_字符串
//             } else {
//                 quan_ping_zhong_shu_ju = 下载远程日数据(全品种列表)
//             }
//             console.log('quan_ping_zhong_shu_ju')
//         }

//         res.json({
//             code: 'ok',
//             data: quan_ping_zhong_shu_ju,
//         })
//     } catch (error) {
//         res.json({
//             code: 'error',
//             msg: '获取品种日数据失败失败!',
//         })
//     }
// }

// export default (app: any) => {
//     app.post('/quan_ping_zhong_shu_ju', 获取全品种日数据)
// }
