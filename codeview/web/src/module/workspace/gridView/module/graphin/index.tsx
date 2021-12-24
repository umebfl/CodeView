import { FC, useEffect } from 'react'
import GridPaper from 'src/module/workspace/gridView/component/gridPaper'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

const Graphin: FC = ({ children, ...prpos }) => {
    const { data } = useSelector((state: RootState) => state.source)
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {}, [])

    return <GridPaper {...prpos}>Graphin</GridPaper>
}

export default Graphin
