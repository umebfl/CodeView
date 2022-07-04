import { createTransform } from 'redux-persist'

import { DataSourceEnum } from 'src/reducer/userConfig/type'

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState: any, key) => {
        // old persisted state
        if (
            inboundState.dataSource &&
            (inboundState.dataSource === 'guangzhou' ||
                inboundState.dataSource === 'shenzhen')
        ) {
            return {
                ...inboundState,
                dataSource:
                    inboundState.dataSource === 'guangzhou'
                        ? DataSourceEnum.guangzhou
                        : DataSourceEnum.shenzhen,
            }
        }

        return inboundState
    },

    // transform state being rehydrated
    (outboundState: any, key) => {
        // old persisted state
        if (
            outboundState.dataSource &&
            (outboundState.dataSource == 'guangzhou' ||
                outboundState.dataSource == 'shenzhen')
        ) {
            return {
                ...outboundState,
                dataSource:
                    outboundState.dataSource === 'guangzhou'
                        ? DataSourceEnum.guangzhou
                        : DataSourceEnum.shenzhen,
            }
        }

        // convert mySet back to a Set.
        return outboundState
    },
    // define which reducers this transform gets called for.
    // { whitelist: ['someReducer'] }
    { whitelist: ['userConfig', 'language'] }
)

export default SetTransform
