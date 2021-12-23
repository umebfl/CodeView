import { FC } from 'react'
import { map, toPairs, compose } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

import GridPaper from 'src/module/workspace/gridView/component/gridPaper'
import {
    optionType,
    // optionParentNodeType,
    // optionSubNodeType,
} from 'src/reducer/userConfig/type'

const t: Record<string, number> = {
    a: 1,
    b: 2,
}

console.log(map((item: number) => item)(t))

const MenuBar: FC = ({ children, ...prpos }) => {
    const { option } = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()

    // const buildNode = (option: optionParentNodeType | optionSubNodeType) => {
    //     debugger
    //     return <div>{option.name}</div>
    // }

    // const node1 = map(item => {return item}})(option)
    console.log(typeof option)
    console.log(option)

    const node = <div>{''}</div>

    return <GridPaper {...prpos}>{node}</GridPaper>
}

export default MenuBar
