import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { Link, useNavigate } from 'react-router-dom'

import { info } from 'src/util/loger/index'
import request from 'src/util/request'
import Breadcrumbs from 'src/component/breadcrumbs'
import { serverType } from 'src/reducer/uploadServer'

interface payloadType {
    data: Array<serverType>
    dispatch: Function
}

// TODO cmp?
const reqData = async (dispatch: Function) => {
    const data = await request('/UploadServer')

    if (data.uploadServerInfos) {
        dispatch({
            type: 'uploadServer/setData',
            payload: data.uploadServerInfos,
        })
    }
}

// TODO cmp
const CustomTableCell = ({ children, ...props }: TableCellProps) => {
    const theme = useTheme()

    return (
        <TableCell
            sx={{ color: theme.color.grey20, padding: 1.6, border: 0 }}
            {...props}
        >
            {children}
        </TableCell>
    )
}

// TODO cmp
const CustomTableHeaderCell = ({ children, ...props }: TableCellProps) => {
    const theme = useTheme()
    return (
        <TableCell
            sx={{
                // borderTop: `1px solid ${theme.color.grey5}`,
                // borderBottom: "1px solid rgba(19, 78, 249, 0.5)",
                borderBottom: theme.borderLine.lightSolid,
                fontSize: 13,
                color: theme.color.grey20,
                fontWeight: 'bold',
                padding: 1.6,
            }}
            {...props}
        >
            {children}
        </TableCell>
    )
}

const UploadServerList = ({ data, dispatch }: payloadType) => {
    info('UploadServerList render')
    const theme = useTheme()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch({
            type: 'test',
        })

        reqData(dispatch)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(theme)

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

            {/* TODO cmp */}
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <CustomTableHeaderCell align="center" width={50}>
                                序号
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center">
                                ID
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center">
                                运行状态
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell width={100}>
                                空插槽数
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center" width={100}>
                                已完成数
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center" width={100}>
                                总插槽数
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center">
                                位置
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center">
                                slotInfos
                            </CustomTableHeaderCell>
                            <CustomTableHeaderCell align="center">
                                操作
                            </CustomTableHeaderCell>
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
                                <CustomTableCell align="center">
                                    {index + 1}
                                </CustomTableCell>
                                <CustomTableCell align="center">
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
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    <Box
                                        sx={{
                                            color: row.isRunning
                                                ? theme.palette.success.dark
                                                : theme.palette.error.dark,
                                        }}
                                    >
                                        {row.isRunning ? '运行中' : '关闭'}
                                    </Box>
                                </CustomTableCell>
                                <CustomTableCell component="th" scope="row">
                                    {row.emptySlotsNum}
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    {row.formattedDisksNum}
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    {row.totalSlotsNum}
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    {row.uploadServerLocation}
                                </CustomTableCell>
                                <CustomTableCell align="center">
                                    {/* {row.slotInfos} */}-
                                </CustomTableCell>
                                <CustomTableCell align="center">
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
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UploadServerList
