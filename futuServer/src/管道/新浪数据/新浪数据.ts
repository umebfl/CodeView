import { match, replace } from 'ramda'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment'
const path = require('path')

import { type_基础品种信息 } from '../品种信息/全品种列表'

const 单品种日数据获取 = async (合约: string) => {
    try {
        const 请求 = await fetch(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getDailyKLine?symbol=${合约}`
        )
        const 数据 = await 请求.text()
        const 日列表字符串_特殊 = match(/\[.*\]/)(数据)
        const 日列表字符串 = 日列表字符串_特殊.length
            ? replace('\\', '')(日列表字符串_特殊[0])
            : ''

        const 结果 = JSON.parse(日列表字符串)
        return 结果
    } catch (error) {
        console.error(error)
    }
    return []
}

export const 全品种日数据获取 = async (全品种列表: type_基础品种信息[]) => {
    let 数据 = {}
    const 文件夹名 = moment().format('YYYY-MM-DD')
    const 路径 = './数据/全品种连续合约日数据'
    const 文件夹路径 = `${路径}/${文件夹名}`

    // 读取文件
    if (fs.existsSync(文件夹路径)) {
        try {
            for (let 下标 = 0; 下标 < 全品种列表.length; 下标++) {
                const 品种 = 全品种列表[下标]
                数据[品种.代码] = JSON.parse(
                    fs
                        .readFileSync(`${文件夹路径}/${品种.代码}0.txt`)
                        .toString()
                )
                console.log(`读取文件：${品种.代码}0合约日数据成功`)
            }
        } catch (error) {
            console.error(`读取文件失败-${error}`)
        }
    } else {
        // 如果没有文件
        fs.mkdirSync(文件夹路径, {
            recursive: true,
        })

        for (let 下标 = 0; 下标 < 全品种列表.length; 下标++) {
            const 品种 = 全品种列表[下标]
            const 日数据 = await 单品种日数据获取(`${品种.代码}0`)

            fs.writeFileSync(
                `${文件夹路径}/${品种.代码}0.txt`,
                JSON.stringify(日数据)
            )

            await new Promise(resolve => setTimeout(resolve, 300))

            数据[品种.代码] = 日数据
            console.log(`${品种.代码}0合约日数据获取成功`)
        }
    }

    return 数据
}

const 单品种分时数据获取 = async (合约: string) => {
    try {
        const 请求 = await fetch(
            `https://stock2.finance.sina.com.cn/futures/api/jsonp.php/var%20_fsdata=/InnerFuturesNewService.getMinLine?symbol=${合约}`
        )
        const 数据 = await 请求.text()
        const 分时列表字符串_特殊 = match(/\[.*\]/)(数据)
        const 结果 = 分时列表字符串_特殊.length
            ? JSON.parse(分时列表字符串_特殊[0])
            : []

        return 结果
    } catch (error) {
        console.error(error)
    }
    return []
}

export const 全品种连续合约分时数据获取 = async (
    全品种列表: type_基础品种信息[],
    类型: '连续' | '指定'
) => {
    let 数据 = {}
    const 文件夹名 = moment().format('YYYY-MM-DD_HH-mm')
    const 路径 = `./数据/全品种${类型}合约分时数据`
    const 文件夹路径 = `${路径}/${文件夹名}`

    const 连续合约 = '2205'

    // 读取文件
    if (fs.existsSync(文件夹路径)) {
        try {
            for (let 下标 = 0; 下标 < 全品种列表.length; 下标++) {
                const 品种 = 全品种列表[下标]
                const 文件名 = `${品种.代码}${
                    类型 === '连续' ? 连续合约 : 品种.关注合约
                }`
                const 内容: string = fs
                    .readFileSync(`${文件夹路径}/${文件名}.txt`)
                    .toString()

                数据[品种.代码] = JSON.parse(内容)

                console.log(`读取文件：${文件名}合约分时数据成功`)
            }
        } catch (error) {
            console.error(error)
        }
    } else {
        // 如果没有文件
        fs.mkdirSync(文件夹路径, {
            recursive: true,
        })

        for (let 下标 = 0; 下标 < 全品种列表.length; 下标++) {
            const 品种 = 全品种列表[下标]
            const 合约 = `${品种.代码}${
                类型 === '连续' ? 连续合约 : 品种.关注合约
            }`
            const 日数据 = await 单品种分时数据获取(`${合约}`)

            fs.writeFileSync(
                `${文件夹路径}/${合约}.txt`,
                JSON.stringify(日数据)
            )

            await new Promise(resolve => setTimeout(resolve, 300))

            数据[品种.代码] = 日数据
            console.log(`${合约}合约分时数据获取成功`)
        }
    }

    console.log(`全品种${类型}合约分时数据获取成功`)

    return 数据
}
