const key = 'graphLayout'

const initialState = {
    [key]: {
        data: 'dagre',
        type: [
            {
                key: 'force',
                lable: '经典力导向布局',
            },
            {
                key: 'concentric',
                lable: '同心圆布局',
            },
            {
                key: 'radial',
                lable: '辐射布局',
            },
            {
                key: 'circular',
                lable: '圆形布局',
            },
            {
                key: 'dagre',
                lable: 'Dagre布局',
            },
            {
                key: 'grid',
                lable: '网格布局',
            },
            {
                key: 'fructherman',
                lable: 'Fruchterman布局',
            },
            {
                key: 'mds',
                lable: 'MDS布局',
            },
            {
                key: 'random',
                lable: '随机布局',
            },
        ],
    },
}

const reducer = {
    [`${key}/setData`]: (state, payload) => {
        return {
            ...state,
            [key]: {
                ...state[key],
                data: payload,
            },
        }
    },
}

const combine = {
    initialState,
    reducer,
}

export default combine
