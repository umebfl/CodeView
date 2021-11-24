import { GraphinContext } from '@antv/graphin'
import React from 'react'

const defaultHullCfg = {
    members: [],
    type: 'round-convex',
    nonMembers: [],
    style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2,
    },
    padding: 10,
}

/**
 * deep merge hull config
 * @param defaultCfg
 * @param cfg
 */
const deepMergeCfg = (defaultCfg, cfg) => {
    const { style: DefaultCfg = {}, ...defaultOtherCfg } = defaultCfg
    const { style = {}, ...others } = cfg
    return {
        ...defaultOtherCfg,
        ...others,
        style: {
            ...DefaultCfg,
            ...style,
        },
    }
}

let hullInstances

const Hull = props => {
    const graphin = React.useContext(GraphinContext)
    const { graph } = graphin

    React.useEffect(() => {
        const { options } = props

        graph.removeHulls()

        hullInstances = options.map(item => {
            return graph.createHull(
                // @ts-ignore
                deepMergeCfg(defaultHullCfg, {
                    id: `${Math.random()}`, // Utils.uuid(),
                    ...item,
                })
            )
        })

        const handleAfterUpdateItem = () => {
            hullInstances.forEach(item => {
                item.updateData(item.members)
            })
        }

        graph.on('afterupdateitem', handleAfterUpdateItem)
        return () => {
            graph.on('afterupdateitem', handleAfterUpdateItem)
        }
    }, [props, graph])

    return <div className="graphin-hull-container" />
}
export default Hull
