import { FC } from 'react'
import GridPaper from 'src/module/workspace/gridView/component/gridPaper'

const Config: FC = ({ children, ...prpos }) => {
    return <GridPaper {...prpos}>Config</GridPaper>
}

export default Config
