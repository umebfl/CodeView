import { statistics } from 'src/util/loger'

export const viewInterceptor = (fn) => {
    return (payload) => {
        const rv = fn(payload)
        fn.name !== 'App' && statistics(fn.name, 'render')
        return rv
    }
}