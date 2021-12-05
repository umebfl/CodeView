import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { info } from 'src/util/loger'
import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState, Dispatch } from 'src/reducer/type'
import {
    DefaultTableCellCell,
    DefaultTableCellHeaderCell,
    NoMoreDataCell,
} from 'src/component/table'

const UploadServerList = () => {
    info('UploadServerList render')
    const theme = useTheme()
    const navigate = useNavigate()

    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.uploadServer.initData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Breadcrumbs allowBack={false}>
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    列表
                </Typography>
            </Breadcrumbs>

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <DefaultTableCellHeaderCell
                                align="center"
                                width={50}
                            >
                                序号
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                ID
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                运行状态
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell width={100}>
                                空插槽数
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell
                                align="center"
                                width={100}
                            >
                                已完成数
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell
                                align="center"
                                width={100}
                            >
                                总插槽数
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                位置
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                slotInfos
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                操作
                            </DefaultTableCellHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={row.uploadServerId}
                                sx={{
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: theme.color.grey2,
                                    },
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    ': hover': {
                                        background: theme.color.grey8,
                                    },
                                }}
                            >
                                <DefaultTableCellCell align="center">
                                    {index + 1}
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    <Link
                                        to={`detail/${row.uploadServerId}`}
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                color: theme.color.grey15,
                                                ': hover': {
                                                    color: theme.color.grey20,
                                                },
                                            }}
                                        >
                                            {row.uploadServerId}
                                        </Box>
                                    </Link>
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    <Box
                                        sx={{
                                            color: row.isRunning
                                                ? theme.palette.success.dark
                                                : theme.palette.error.dark,
                                        }}
                                    >
                                        {row.isRunning ? '运行中' : '关闭'}
                                    </Box>
                                </DefaultTableCellCell>
                                <DefaultTableCellCell
                                    component="th"
                                    scope="row"
                                >
                                    {row.emptySlotsNum}
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    {row.formattedDisksNum}
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    {row.totalSlotsNum}
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    {row.uploadServerLocation}
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    -
                                </DefaultTableCellCell>
                                <DefaultTableCellCell align="center">
                                    <Button
                                        size="small"
                                        variant="text"
                                        onClick={() =>
                                            navigate(
                                                `detail/${row.uploadServerId}`
                                            )
                                        }
                                    >
                                        查看
                                    </Button>
                                </DefaultTableCellCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <NoMoreDataCell cellColSpan={10} />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UploadServerList
