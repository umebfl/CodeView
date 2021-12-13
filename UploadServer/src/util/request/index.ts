import { Dispatch } from 'src/reducer/type'

import { errorLog } from 'src/util/loger'

let loadingIndex = 0

interface RequestPropsType {
    url: string
    payload?: RequestInit
    dispatch?: Dispatch
    loadingTips?: boolean
    errorTips?: boolean
}

const Request = async ({
    url,
    payload,
    dispatch,
    loadingTips = true,
    errorTips = true,
}: RequestPropsType) => {
    const loadingFlag = `${url}-${loadingIndex++}`

    try {
        if (loadingTips !== false) {
            dispatch?.globalLoading?.push(loadingFlag)
        }

        const rv = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            ...payload,
        })

        if (rv?.status === 200) {
            const data = await rv.json()

            if (data.code === 0) {
                loadingTips && dispatch?.globalLoading?.remove(loadingFlag)
                return data.data
            }

            throw data.msg
        }

        throw '内部错误，请刷新页面'
    } catch (error) {
        errorLog('Request error', `url: ${url}\n`, `error: ${error}\n`)

        loadingTips && dispatch?.globalLoading?.remove(loadingFlag)

        const errorMsg = `请求数据失败：${error}`

        if (errorTips) {
            dispatch?.snackbar.push({
                timeStamp: new Date().getTime(),
                severity: 'error',
                msg: errorMsg,
            })
        } else {
            throw errorMsg
        }
    }
}

export default Request
