import { FC, useEffect } from 'react'
import GridPaper from 'src/module/workspace/gridView/component/gridPaper'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'
import { useDebounceFn } from 'ahooks'

import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import { isEmpty, map } from 'ramda'

import { SourceDFType, SourceDirType } from 'src/reducer/source/type'

const Source: FC = ({ children, ...prpos }) => {
    const { option } = useSelector((state: RootState) => state.userConfig)
    const { data, disposeData } = useSelector(
        (state: RootState) => state.source
    )
    const { rehydrated } = useSelector((state: RootState) => state._persist)
    const dispatch = useDispatch<Dispatch>()
    const deboHandleInputChange = useDebounceFn(
        () => dispatch.source.initData(null),
        {
            wait: 800,
        }
    )

    const path = option['root/code/path'].value

    useEffect(() => {
        deboHandleInputChange.run()
    }, [rehydrated, path])

    const buildNode = (type: string, data: SourceDFType) => {
        if (isEmpty(data)) {
            return null
        }

        if (data.type === 'dir') {
            const list = (data as SourceDirType).list

            const node = map((item: SourceDFType) => {
                return buildNode(type, item)
            })(list)

            return (
                <TreeItem
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}
                    key={`${type}-${data.path}`}
                    nodeId={`${type}-${data.path}`}
                    label={data.name}
                >
                    {node}
                </TreeItem>
            )
        }

        return (
            <TreeItem
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                }}
                key={`${type}-${data.path}`}
                nodeId={`${type}-${data.path}`}
                label={data.name}
            ></TreeItem>
        )
    }

    const sourceNode = buildNode('source', data)
    const parseSourceNode = buildNode('parseSource', disposeData)

    return (
        <GridPaper {...prpos}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                    flexGrow: 1,
                    height: '98%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start ',
                        padding: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 0.5,
                            width: 70,
                            textAlign: 'right',
                            paddingRight: 0.5,
                        }}
                    >
                        源代码:
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        {sourceNode}
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start ',
                        padding: 0.5,
                    }}
                >
                    <Box
                        sx={{
                            marginTop: 0.5,
                            width: 70,
                            textAlign: 'right',
                            paddingRight: 0.5,
                        }}
                    >
                        parseSource:
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            overflow: 'hidden',
                        }}
                    >
                        {parseSourceNode}
                    </Box>
                </Box>
            </TreeView>
        </GridPaper>
    )
}

export default Source
