import { FC } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

import GridPaper from 'src/module/workspace/gridView/component/gridPaper'
import { Box } from '@mui/system'

const Statistics: FC = ({ children, ...prpos }) => {
    const { statistics } = useSelector((state: RootState) => state.source)
    const dispatch = useDispatch<Dispatch>()

    const List = ({ label, val }: { label: string; val: string | number }) => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
            }}
        >
            <Box sx={{ marginRight: 1, width: 80, textAlign: 'right' }}>
                {label}:
            </Box>
            <Box>{val}</Box>
        </Box>
    )

    return (
        <GridPaper {...prpos} sx={{ padding: 0.5 }}>
            <List label="总文件数" val={statistics.totalFile}></List>
            <List label="总代码行数" val={statistics.totalLine}></List>
        </GridPaper>
    )
}

export default Statistics
