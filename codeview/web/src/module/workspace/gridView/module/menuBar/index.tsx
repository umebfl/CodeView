import { FC } from 'react'
import {
    map,
    toPairs,
    compose,
    assocPath,
    filter,
    addIndex,
    update,
    assoc,
} from 'ramda'
import Box from '@mui/material/Box'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Switch from '@mui/material/Switch'
import Input from '@mui/material/Input'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

import GridPaper from 'src/module/workspace/gridView/component/gridPaper'
import {
    optionType,
    optionSubNodeType,
    optionDataType,
    optionPath,
} from 'src/reducer/userConfig/type'

const MenuBar: FC = ({ children, ...prpos }) => {
    const { option } = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()

    // const handleSwitchChange = (key: string) => {
    //     const data = option[key] as optionSubNodeType

    //     const newData: optionType = {
    //         ...data,
    //         value: !data.value,
    //     }

    //     const newOption = assoc(key, newData, option)

    //     dispatch.userConfig.setOption(newOption)
    // }

    // const handleInputChange = (key: string, val: string) => {
    //     const data = option[key] as optionSubNodeType

    //     const newData: optionType = {
    //         ...data,
    //         value: val,
    //     }

    //     const newOption = assoc(key, newData, option)

    //     dispatch.userConfig.setOption(newOption)
    // }

    // const node = compose(
    //     // map(item => {
    //     //     const key = item[0]
    //     //     const val = item[1] as optionSubNodeType

    //     //     return (
    //     //         <Box
    //     //             key={key}
    //     //             sx={{
    //     //                 display: 'flex',
    //     //                 flexDirection: 'row',
    //     //                 justifyContent: 'flex-start',
    //     //                 alignItems: 'center',
    //     //                 paddingLeft: 1,
    //     //                 paddingRight: 1,
    //     //             }}
    //     //         >
    //     //             <Box
    //     //                 sx={{
    //     //                     width: 70,
    //     //                     textAlign: 'right',
    //     //                 }}
    //     //             >
    //     //                 {val.label}
    //     //             </Box>
    //     //             <Box
    //     //                 sx={{
    //     //                     display: 'flex',
    //     //                     flexDirection: 'column',
    //     //                     marginLeft: 1,
    //     //                     marginRight: 1,
    //     //                     flex: 1,
    //     //                 }}
    //     //             >
    //     //                 {val.dataType === optionDataType.switch ? (
    //     //                     <Switch
    //     //                         checked={val.value as boolean}
    //     //                         onChange={() => handleSwitchChange(key)}
    //     //                     />
    //     //                 ) : val.dataType === optionDataType.input ? (
    //     //                     <Input
    //     //                         value={val.value}
    //     //                         onChange={e =>
    //     //                             handleInputChange(key, e.target.value)
    //     //                         }
    //     //                     />
    //     //                 ) : null}
    //     //             </Box>
    //     //         </Box>
    //     //     )
    //     // }),
    //     // toPairs,
    //     // filter((key: string) => option[key].type === 'children'),
    //     map((key: keyof typeof optionPath) => [key, option[key]]),
    //     // Object.keys
    // )(option)

    const list = Object.keys(option)

    const node = list.map(item => {
        const key = item as keyof typeof optionPath
        option[key]
    })

    debugger
    return (
        <GridPaper
            {...prpos}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                // expanded={['root']}
                sx={{
                    flexGrow: 1,
                    height: '98%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            > */}
            <>{node}</>
            {/* </TreeView> */}
        </GridPaper>
    )
}

export default MenuBar

// const buildNode = (path: string[], optionNode: optionType) => {
//     const subOption = (optionNode as optionParentNodeType).children

//     if (subOption) {
//         const keys = Object.keys(subOption)
//         const node = map((key: string) => {
//             return buildNode([...path, 'children', key], subOption[key])
//         })(keys)

//         return (
//             <TreeItem
//                 key={optionNode.id}
//                 nodeId={optionNode.id}
//                 label={optionNode.label}
//             >
//                 {node}
//             </TreeItem>
//         )
//     }

//     const handleSwitchChange = () => {
//         const newOption = assocPath(
//             [...path, 'currentValue'],
//             !optionNode.currentValue,
//             option
//         )

//         dispatch.userConfig.setOption(newOption)
//     }

//     return (
//         <TreeItem
//             key={optionNode.id}
//             nodeId={optionNode.id}
//             label={
//                 <Box>
//                     {optionNode.label}
//                     {(optionNode as optionSubNodeType).type ===
//                     optionDataType.switch ? (
//                         <Switch onChange={() => handleSwitchChange()} />
//                     ) : optionDataType.switch ? null : null}
//                 </Box>
//             }
//         ></TreeItem>
//     )
// }
