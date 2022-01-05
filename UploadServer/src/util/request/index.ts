/** No need unit test */
import { toLower } from 'ramda'
import { useT } from 'src/hooks/language'
import { langSet } from 'src/reducer/language/type'
import { Dispatch } from 'src/reducer/type'

import { errorLog } from 'src/util/loger'

let loadingIndex = 0

interface RequestPropsType {
    url: string
    language: langSet
    payload?: RequestInit
    dispatch?: Dispatch
    loadingTips?: boolean
    errorTips?: boolean
}

const Request = async ({
    url,
    payload,
    dispatch,
    language,
    loadingTips = true,
    errorTips = true,
}: RequestPropsType) => {
    const loadingFlag = `${url}-${loadingIndex++}`
    const t = useT()

    try {
        if (loadingTips !== false) {
            dispatch?.globalLoading?.push(loadingFlag)
        }

        const rv = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': toLower(language),
            },
            ...payload,
        })

        if (rv?.status === 200) {
            const data = await rv.json()

            if (data.code === 0) {
                loadingTips && dispatch?.globalLoading?.remove(loadingFlag)
                return data.data
            }

            throw new Error(data.msg)
        }

        // TODO language
        throw new Error('内部错误，请刷新页面')
    } catch (error) {
        errorLog('Request error', `url: ${url}\n`, `error: ${error}\n`)

        loadingTips && dispatch?.globalLoading?.remove(loadingFlag)

        if (errorTips) {
            dispatch?.snackbar.push({
                timeStamp: new Date().getTime(),
                severity: 'error',
                msg: `${error}`,
            })
        } else {
            throw error
        }
    }
}

export default Request
