import { Dispatch } from 'src/reducer/type'

import { errorLog } from 'src/util/loger'

let index = 0

const Request = async (
    url: string,
    payload?: RequestInit,
    dispatch?: Dispatch
) => {
    const loadingIndex = `${url}${index++}`
    dispatch?.globalLoading.add(loadingIndex)

    try {
        const rv = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            ...payload,
        })

        if (rv.status === 200) {
            dispatch?.globalLoading.remove(loadingIndex)
            const data = await rv.json()

            if (data.code === 0) {
                return data.data
            }

            throw new Error(data.msg)
        } else {
            dispatch?.snackbar.push({
                timeStamp: new Date().getTime(),
                severity: 'error',
                msg: 'Internal Server Error， Please refresh the page!',
            })
        }
    } catch (error) {
        errorLog('Request error', `url: ${url}\n`, `error: ${error}\n`)
        dispatch?.globalLoading.remove(loadingIndex)
        throw error
    }
}

export default Request
