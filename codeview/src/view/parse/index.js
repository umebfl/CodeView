import * as R from 'ramda'
import { useEffect, useContext, useState } from 'react'
import Graphin, { GraphinContext } from '@antv/graphin'

import { viewInterceptor } from 'src/util/interceptor'

import Hull from 'src/view/parse/hull'
// // const jscodeshift = require('jscodeshift')
// https://github.com/mobxjs/mobx/tree/main/packages/mobx-undecorate

const SRC_PATH = 'src/'

const buildSankeyData = item => {
    if (item === null) {
        return null
    }

    if (item.list) {
        return R.map(item => buildSankeyData(item))(item.list)
    }

    return {
        comboId: undefined,
        id: item.pathNoSuffix,
        label: item.pathNoSuffix.substring(SRC_PATH.length),
        style: {
            label: {
                value: item.shortName,
                position: 'right',
                fill: 'green',
                fontSize: 8,
                opacity: 0.68,
            },
        },
        program: item.parse.program,
        type: 'graphin-circle',
    }
}

const buildSankeyLink = (item, sankeyLinkMap) => {
    if (item === null) {
        return null
    }

    if (item.list) {
        return R.map(item => buildSankeyLink(item, sankeyLinkMap))(item.list)
    }

    if (item.parse) {
        const importList = R.compose(
            R.map(target => {
                sankeyLinkMap[item.pathNoSuffix] = true
                sankeyLinkMap[target] = true

                return {
                    source: item.pathNoSuffix,
                    target: target,
                }
            }),
            R.filter(
                R.allPass([
                    target => item.pathNoSuffix !== target,
                    // todo: 过滤指定后缀js/jsx
                    path => !R.endsWith('.css')(path),
                    path => !R.startsWith('src/util/')(path),
                    R.startsWith(SRC_PATH),
                ])
            ),
            R.map(item => item.source.value),
            R.filter(item => item.type === 'ImportDeclaration')
        )(item.parse.program.body)

        return importList
    }

    return []
}

const Parse = ({ data, layoutType, dispatch }) => {
    let sankeyData = []
    let sankeyLink = []
    let sankeyLinkMap = {}

    const [tips, setTips] = useState('')

    if (data !== null && data !== undefined) {
        sankeyLink = buildSankeyLink(data, sankeyLinkMap)
        sankeyLink = R.compose(
            R.filter(item => item !== null),
            R.flatten
        )(sankeyLink)

        sankeyData = buildSankeyData(data)
        sankeyData = R.compose(
            // R.uniqBy(item => item.name),
            R.filter(item => sankeyLinkMap[item.id]),
            R.filter(item => item !== null),
            R.flatten
        )(sankeyData)
    }

    const graphinData = {
        combos: undefined,
        edges: sankeyLink,
        nodes: sankeyData,
    }

    const Behavior = () => {
        const { graph } = useContext(GraphinContext)

        useEffect(() => {
            const handleClick = evt => {
                const node = evt.item
                const model = node.getModel()
                // apis.focusNodeById(model.id)
                dispatch({
                    type: 'program/setData',
                    payload: model.program.body,
                })
            }

            const handleHover = evt => {
                const node = evt.item
                const model = node.getModel()
                setTips(model.id)
            }
            const handleMouseleave = evt => {
                setTips('')
            }

            graph.on('node:click', handleClick)
            graph.on('node:mouseenter', handleHover)
            graph.on('node:mouseleave', handleMouseleave)

            return () => {
                graph.off('node:click', handleClick)
                graph.off('node:mouseenter', handleHover)
                graph.off('node:mouseleave', handleMouseleave)
            }
        }, [graph])

        return null
    }

    const hullOptions = R.compose(
        R.map(item => ({
            members: R.map(mem => mem.id)(item[1]),
        })),
        R.filter(item => item[0].length > 0 && item[1].length > 1),
        R.toPairs,
        // R.tap(item => {
        //     debugger
        // }),
        R.groupBy(item => {
            const sub = R.match(/^.*\/.*\//)(item.id)
            return sub.join('')
        })
    )(sankeyData)

    return (
        <div>
            <div>Node: {tips}</div>
            <Graphin
                width={1000}
                height={1000}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#FEFEFE',
                }}
                data={graphinData}
                layout={{ type: layoutType, center: [500, 500] }}
            >
                {sankeyData.length && <Hull options={hullOptions} />}
                <Behavior></Behavior>
            </Graphin>
        </div>
    )
}

export default viewInterceptor(Parse)
