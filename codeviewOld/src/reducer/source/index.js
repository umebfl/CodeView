import * as R from 'ramda'

const initialState = {
    source: {
        fileMap: null,
    },
}

const reducer = {
    'source/setFileMap': (state, payload) => {
        // const totalLine = R.compose(R.tag(console.log))(payload)

        const getTotalLine = mapData => {
            if (mapData.list) {
                return R.reduce((count, item) => {
                    return item ? count + getTotalLine(item) : count
                }, 0)(mapData.list)
            }

            if (mapData?.parse) {
                return mapData?.parse.loc.end.line
            }

            return 0
        }

        const totalLine = getTotalLine(payload)

        return {
            ...state,
            source: {
                ...state.source,
                fileMap: payload,
                totalLine,
            },
        }
    },
}

const source = {
    initialState,
    reducer,
}

export default source
