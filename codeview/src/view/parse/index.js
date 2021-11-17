import * as R from 'ramda'
import { useContext } from 'react'
import Graphin from '@antv/graphin';

import { info } from 'src/util/loger'
import { Context } from 'src/reducer'

// // const jscodeshift = require('jscodeshift')
// https://github.com/mobxjs/mobx/tree/main/packages/mobx-undecorate


const buildSankeyData = (item) => {

    if(item === null) {
        return null
    }

    if(item.list) {
        return R.map(item => buildSankeyData(item))(item.list)
    }

    return {
        comboId: undefined,
        id: item.pathNoSuffix,
        label: item.pathNoSuffix,
        style: {
            label: {
                value: item.pathNoSuffix,
            },
        },
        type: 'graphin-circle',
    }
}

const buildSankeyLink = (item, sankeyLinkMap) => {

    if(item === null) {
        return null
    }

    if(item.list) {
        return R.map(item => buildSankeyLink(item, sankeyLinkMap))(item.list)
    }

    if(item.parse) {
        const importList = R.compose(
            R.filter(item => item.source !== item.target),
            R.map(target => {

                sankeyLinkMap[item.pathNoSuffix] = true
                sankeyLinkMap[target] = true

                return {
                    source: item.pathNoSuffix,
                    target: target,
                }
            }),
            R.filter(path => !R.endsWith('.css')(path)),
            R.filter(R.startsWith('src/')),
            R.map(item => item.source.value),
            R.filter(item => item.type === 'ImportDeclaration'),
        )(item.parse.program.body)
        
        return importList
    }

    return []
}

const Parse = () => {
    info('Parse | render')

    const {state, dispatch} = useContext(Context)

    let sankeyData = []
    let sankeyLink = []
    let sankeyLinkMap = {}

    if(state.source.fileMap !== null && state.source.fileMap !== undefined) {

        sankeyLink = buildSankeyLink(state.source.fileMap, sankeyLinkMap)
        sankeyLink = R.compose(
            R.filter(item => item !== null),
            R.flatten,
        )(sankeyLink)

        sankeyData = buildSankeyData(state.source.fileMap)
        sankeyData = R.compose(
            // R.uniqBy(item => item.name),
            R.filter(item => sankeyLinkMap[item.id]),
            R.filter(item => item !== null),
            R.flatten,
        )(sankeyData)
    }

    const data = {
        combos: undefined,
        edges: sankeyLink,
        nodes: sankeyData,
    }
    console.log(data, sankeyLinkMap);

    return (
        <Graphin style={{
            width: '100%',
            height: '100%',
        }} data={data} layout={{ type: 'dagre' }}></Graphin>
    )
}

export default Parse