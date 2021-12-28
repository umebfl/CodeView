import { FC, useEffect, useContext, useState, useMemo, useRef } from 'react'
import Graphin, { GraphinContext } from '@antv/graphin'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

import GridPaper from 'src/module/workspace/gridView/component/gridPaper'
import {
    allPass,
    compose,
    contains,
    endsWith,
    filter,
    find,
    flatten,
    forEach,
    map,
    split,
    startsWith,
} from 'ramda'
import {
    fileType,
    SourceDFType,
    SourceDirType,
    SourceFileType,
} from 'src/reducer/source/type'
import { useSize } from 'ahooks'
import Box from '@mui/material/Box'
import { Theme, useTheme } from '@mui/material/styles'
import { optionType } from 'src/reducer/userConfig/type'

const Behavior = () => {
    const { graph } = useContext(GraphinContext)
    const { disposeFileList } = useSelector((state: RootState) => state.source)
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const handleClick = (evt: any) => {
            const node = evt.item
            const model = node.getModel()

            // apis.focusNodeById(model.id)
            // dispatch({
            //     type: 'program/setData',
            //     payload: model.program.body,
            // })

            const data = find(
                (item: SourceFileType) => item.pathNoSuffix === model.id
            )(disposeFileList)

            data && dispatch.source.setFocusSourceData(data)
        }

        const handleHover = (evt: any) => {
            const node = evt.item
            const model = node.getModel()
            // setTips(model.id)
            // setLineTips(model.program.loc.end.line)
        }
        const handleMouseleave = (evt: any) => {
            const node = evt.item
            // setTips('-')
            // setLineTips(0)
        }

        graph.on('node:click', handleClick)
        graph.on('node:mouseenter', handleHover)
        graph.on('node:mouseleave', handleMouseleave)

        return () => {
            graph.off('node:click', handleClick)
            graph.off('node:mouseenter', handleHover)
            graph.off('node:mouseleave', handleMouseleave)
        }
    }, [graph, disposeFileList])

    return null
}

const buildSankeyLink = (
    item: SourceDFType,
    theme: Theme,
    option: optionType,
    sankeyLinkMap: Record<string, true>
): any => {
    if (item === null) {
        return null
    }

    if (item.type === 'dir') {
        const data = map((item: SourceDFType) =>
            buildSankeyLink(item, theme, option, sankeyLinkMap)
        )((item as SourceDirType).list)

        return compose(
            filter(item => item !== null),
            item => flatten(item)
        )(data)
    }

    // file
    const data = item as SourceFileType

    // 排除
    if (sankeyLinkMap[data.pathNoSuffix] !== true) {
        return null
    }

    const importList = compose(
        map(target => {
            // sankeyLinkMap[item.pathNoSuffix] = true
            // sankeyLinkMap[target] = true

            return {
                source: data.pathNoSuffix,
                target: target,
            }
        }),
        // (item: any) => {
        //     debugger
        //     return item
        // },
        filter(
            allPass([
                // target => item.pathNoSuffix !== 'type',
                // 过滤接口文件依赖type.ts
                // path => !endsWith('/type')(path),

                // // todo: 过滤指定后缀js/jsx
                path => !endsWith('.css')(path),

                // // 过滤工具类
                // path => !startsWith('src/util/')(path),
                // // TODO: 过滤Hooks类 UI参数
                // path => !startsWith('src/hooks/')(path),
                // // TODO: 过滤组件类 UI参数
                // path => !startsWith('src/component/')(path),
                // // 过滤组件类
                // path => !endsWith('.json')(path),
                // startsWith(SRC_PATH),

                // 过滤不存在项
                target => sankeyLinkMap[target] === true,
                // 过滤非src项
                // contains('src/'),
                path => {
                    const aliasList = split(',')(
                        option['root/code/importSuffix'].value as string
                    )

                    let rv = false

                    forEach((item: string) => {
                        if (startsWith(item)(path)) {
                            rv = true
                        }
                    })(aliasList)
                    debugger
                    return rv
                },
            ])
        ),
        map((item: any) => item.source.value),
        filter((item: any) => item.type === 'ImportDeclaration')
    )(data.parse.program.body)

    return importList
}

const buildSankeyData = (
    item: SourceDFType,
    theme: Theme,
    option: optionType
): any => {
    if (item.type === 'dir') {
        const data = map((item: SourceDFType) =>
            buildSankeyData(item, theme, option)
        )((item as SourceDirType).list)

        return compose(
            filter(item => item !== null),
            item => flatten(item)
        )(data)
    }

    // file
    const data = item as SourceFileType

    // 排除type类型文件
    if (
        option['root/code/type/show'].value === false &&
        data.fileType === 'type'
    ) {
        return null
    }

    // 排除组件类型文件
    if (
        option['root/code/component/show'].value === false &&
        data.fileType === 'component'
    ) {
        return null
    }

    // 排除Util类型文件
    if (
        option['root/code/util/show'].value === false &&
        data.fileType === 'util'
    ) {
        return null
    }

    // 排除Hook类型文件
    if (
        option['root/code/hook/show'].value === false &&
        data.fileType === 'hook'
    ) {
        return null
    }

    const size = data.parse.loc.end.line / 2
    const maxLine = 500 / 2

    return {
        comboId: undefined,
        id: data.pathNoSuffix,
        label:
            data.fileType === fileType.type
                ? data.pathNoSuffix
                : data.shortName,
        style: {
            keyshape: {
                fill: size > maxLine ? '#A52A2A' : 'green',
                // line过大 红色边框标记
                stroke: theme.palette.grey[900],
                fillOpacity: 1,
                size: size < 10 ? 10 : size,
            },
            // icon: data.isComponent
            //     ? {
            //           type: 'image',
            //           value: `https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg`,
            //           size: [20, 20],
            //       }
            //     : {},

            // badges: data.isComponent
            //     ? [
            //           {
            //               position: 'RT',
            //               type: 'text',
            //               value: 'C',
            //               size: [15, 15],
            //               fill: 'green',
            //               color: 'white',
            //           },
            //       ]
            //     : [],
            label: {
                value: data.shortName,
                position: 'bottom',
                fill: 'white',
                fontSize: 22,
                opacity: 1,
            },
        },
        program: data.parse.program,
        // style type: react(iconReact) store component(方形) util(icon把手) module
        type: data.fileType === fileType.module ? 'graphin-circle' : 'rect',
    }
}

const buildSankeyLinkMap = (sankeyData: any[]): Record<string, true> => {
    return compose(target => {
        let rv: Record<string, true> = {}
        forEach((item: any) => (rv[item.id] = true))(target)
        return rv
    })(sankeyData)
}

const GraphinModule: FC = ({ children, ...prpos }) => {
    const theme = useTheme()

    const ref = useRef()
    const boxSize = useSize(ref)
    const [size, setSize] = useState({ width: -1, height: -1 })

    const { disposeData } = useSelector((state: RootState) => state.source)
    const { option } = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()

    let sankeyData: any[] = buildSankeyData(disposeData, theme, option)
    let sankeyLinkMap = buildSankeyLinkMap(sankeyData)
    let sankeyLink = buildSankeyLink(disposeData, theme, option, sankeyLinkMap)

    // console.log(disposeData)
    // console.log(sankeyData)
    // console.log(sankeyLink)

    const layoutType = 'dagre'

    const graphinData = {
        combos: undefined,
        edges: sankeyLink,
        nodes: sankeyData,
    }

    useEffect(() => {
        setSize({
            width: boxSize?.width || 0,
            height: boxSize?.height || 0,
        })
    }, [boxSize])

    return (
        <GridPaper {...prpos}>
            <Box
                ref={ref}
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {boxSize?.width === size.width && (
                    <Graphin
                        width={size.width}
                        height={size.height}
                        style={{
                            background: 'transparent',
                        }}
                        data={graphinData}
                        layout={{
                            type: layoutType,
                            center: [500, 500],
                        }}
                    >
                        <Behavior></Behavior>
                    </Graphin>
                )}
            </Box>
        </GridPaper>
    )
}

export default GraphinModule
