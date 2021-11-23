import * as R from 'ramda'
import Graphin from '@antv/graphin'

import { viewInterceptor } from 'src/util/interceptor'

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
                value: item.pathNoSuffix.substring(SRC_PATH.length),
            },
        },
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

const Parse = ({ data }) => {
    let sankeyData = []
    let sankeyLink = []
    let sankeyLinkMap = {}

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
    // console.log(graphinData, sankeyLinkMap);

    return (
        <Graphin
            width={1000}
            height={1000}
            style={{
                width: '100%',
                height: '100%',
                background: '#FEFEFE',
            }}
            data={graphinData}
            layout={{ type: 'dagre', center: [500, 500] }}
        ></Graphin>
    )
}

export default viewInterceptor(Parse)
