/** No need unit test */
import { RematchRootState } from '@rematch/core'
import { toLower } from 'ramda'
import { RootModel } from 'src/reducer'
import { Dispatch } from 'src/reducer/type'

import { errorLog } from 'src/util/loger'

interface RequestPropsType {
    url: string
    payload?: RequestInit
    rootState: RematchRootState<RootModel, Record<string, never>>
    dispatch?: Dispatch
    loadingTips?: boolean
    errorTips?: boolean
}

const Request = async ({
    url,
    payload,
    rootState,
    dispatch,
    loadingTips = true,
    errorTips = true,
}: RequestPropsType) => {
    const loadingFlag = Symbol(url)
    const { lang } = rootState.language

    try {
        if (loadingTips !== false) {
            dispatch?.globalLoading?.push(loadingFlag)
        }

        const rv = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': toLower(lang),
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

        throw new Error(rv.statusText)
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
