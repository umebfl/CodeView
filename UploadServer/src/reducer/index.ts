import uploadServer, { stateType } from 'src/reducer/uploadServer'
import { stateLog } from 'src/util/loger'

export const initialState = {
    ...uploadServer.initState,
}

const rootReducer: Record<string, Function> = {
    ...uploadServer.reducer,
}

const test = () => {
    return new Promise(res => {
        setTimeout(() => {
            res([123])
        }, 3000)
    })
}

const reducer = async (
    state: any,
    action: { type: string | number; payload: any }
) => {
    const fn = rootReducer[action.type]

    if (!fn) {
        throw new Error('action type no found!')
    }

    console.log('1')

    // const nextState = fn(state, action.payload)
    const data = await test()

    console.log('2', data)
    // stateLog(state, nextState, action)

    return state
}

export default reducer
