import { Dispatch } from 'src/reducer/type'

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
        }
    } catch (error) {
        dispatch?.globalLoading.remove(loadingIndex)
        console.error(error)
        throw error
    }
}

export default Request
