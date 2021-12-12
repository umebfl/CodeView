import { useEffect, FC } from 'react'

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
import SearchOffIcon from '@mui/icons-material/SearchOff'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { info } from 'src/util/loger'
import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState, Dispatch } from 'src/reducer/type'
import {
    DefaultTableCellCell,
    DefaultTableCellHeaderCell,
    DefaultTableRow,
    NoMoreDataCell,
} from 'src/component/table'

const UploadServerList: FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()

    const loadData = () => {
        dispatch.uploadServer.initData()
    }

    useEffect(() => {
        if (!data.length) {
            loadData()
        }
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
            <Breadcrumbs allowBack={false} handleRefresh={loadData}>
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    列表
                </Typography>
            </Breadcrumbs>

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <DefaultTableCellHeaderCell align="center">
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
                        {data.length === 0 ? (
                            <DefaultTableRow>
                                <DefaultTableCellCell
                                    align="center"
                                    colSpan={9}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <SearchOffIcon />
                                        列表数据为空。
                                    </Box>
                                </DefaultTableCellCell>
                            </DefaultTableRow>
                        ) : (
                            data.map((row, index) => (
                                <DefaultTableRow key={row.uploadServerId}>
                                    <DefaultTableCellCell align="center">
                                        {index + 1}
                                    </DefaultTableCellCell>
                                    <DefaultTableCellCell
                                        align="center"
                                        sortDirection={'desc'}
                                    >
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
                                                        color: theme.color
                                                            .grey20,
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
                                        {row.formattedDisksNum} /{' '}
                                        {row.totalSlotsNum - row.emptySlotsNum}
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
                                </DefaultTableRow>
                            ))
                        )}
                    </TableBody>
                    <NoMoreDataCell cellColSpan={9} />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UploadServerList
