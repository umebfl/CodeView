import * as R from 'ramda'
import { useEffect, useContext, useState, useMemo } from 'react'
import Graphin, { GraphinContext } from '@antv/graphin'

import { viewInterceptor } from 'src/util/interceptor'

import Hull from './hull'
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

    const size = item.parse.loc.end.line / 2

    // 可配置多目录路径
    // 分级组件？ 内部组件 模块组件 系统组件
    // TODO 可控间距
    // TODO 代码总行数
    // TODO: 可配置参数
    const maxLine = 500 / 2

    return {
        comboId: undefined,
        id: item.pathNoSuffix,
        label: item.pathNoSuffix.substring(SRC_PATH.length),
        // type: react(iconReact) store component(方形) util(icon把手) module
        style: {
            keyshape: {
                fill:
                    size > maxLine
                        ? '#A52A2A'
                        : item.noNeedUnitTest
                        ? 'blue'
                        : item.unitTest
                        ? 'green'
                        : 'grey',
                // line过大 红色边框标记
                stroke: 'white',
                fillOpacity: 0.6,
                size: size < 10 ? 10 : size,
            },
            label: {
                value: item.shortName,
                position: 'bottom',
                fill: '#666',
                fontSize: 16,
                opacity: 1,
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
                    // target => item.pathNoSuffix !== 'type',
                    // 过滤接口文件依赖type.ts
                    path => !R.endsWith('/type')(path),
                    target => item.pathNoSuffix !== target,
                    // todo: 过滤指定后缀js/jsx
                    path => !R.endsWith('.css')(path),
                    // 过滤工具类
                    path => !R.startsWith('src/util/')(path),
                    // TODO: 过滤组件类 UI参数
                    path => !R.startsWith('src/component/')(path),
                    // 过滤组件类
                    path => !R.endsWith('.json')(path),
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
    const { fileMap, totalLine } = data
    let sankeyData = []
    let sankeyLink = []
    let sankeyLinkMap = {}

    const [tips, setTips] = useState('-')
    const [lineTips, setLineTips] = useState(0)

    if (fileMap !== null && fileMap !== undefined) {
        sankeyLink = buildSankeyLink(fileMap, sankeyLinkMap)
        sankeyLink = R.compose(
            R.filter(item => item !== null),
            R.flatten
        )(sankeyLink)

        sankeyData = buildSankeyData(fileMap)
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
                setLineTips(model.program.loc.end.line)
            }
            const handleMouseleave = evt => {
                const node = evt.item
                setTips('-')
                setLineTips(0)
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

    // const hullOption = R.compose(
    //     R.map(item => ({
    //         members: R.map(mem => mem.id)(item[1]),
    //     })),
    //     R.filter(item => item[0].length > 0 && item[1].length > 1),
    //     R.toPairs,
    //     R.groupBy(item => {
    //         const sub = R.match(/^.*\/.*\//)(item.id)
    //         return sub.join('')
    //     })
    // )(sankeyData)

    return (
        <div>
            <div>
                <span>totalLine: {totalLine} | </span>
                <span>Line: {lineTips} | </span>
                <span>Node: {tips} | </span>
            </div>
            <Graphin
                width={1600}
                height={1200}
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#FEFEFE',
                }}
                data={graphinData}
                layout={{ type: layoutType, center: [500, 500] }}
            >
                {/* {hullOption && <Hull options={hullOption} />} */}
                <Behavior></Behavior>
            </Graphin>
        </div>
    )
}

export default viewInterceptor(Parse)
