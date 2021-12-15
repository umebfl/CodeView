import { useState, FC } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { filter, includes } from 'ramda'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Breadcrumbs from 'src/component/breadcrumbs'
import FilterBar from 'src/component/filterBar'
import { RootState, Dispatch } from 'src/reducer/type'
import {
    DefaultTableCellCell,
    DefaultTableCellHeaderCell,
    DefaultTableRow,
    DefaultTableBody,
    NoMoreDataCell,
} from 'src/component/table'
import { uploadServerType } from 'src/reducer/uploadServer/type'

const UploadServerList: FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()
    const [searchText, setSearchText] = useState('')

    const filterData = filter((item: uploadServerType) => {
        return (
            includes(searchText)(item.uploadServerId) ||
            includes(searchText)(item.uploadServerLocation) ||
            includes(searchText)(item.isRunningStr) ||
            includes(searchText)(item.operationTips)
        )
    })(data)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Breadcrumbs
                allowBack={false}
                handleRefresh={dispatch.uploadServer.initData}
            >
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    列表
                </Typography>
            </Breadcrumbs>

            <FilterBar
                inputProps={{
                    placeholder: 'ID/运行状态/位置/操作提示',
                }}
                handleChange={setSearchText}
            />

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
                                操作提示
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                操作
                            </DefaultTableCellHeaderCell>
                        </TableRow>
                    </TableHead>
                    <DefaultTableBody>
                        {filterData.map((row, index) => (
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
                                        {row.isRunningStr}
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
                                    {row.operationTips}
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
                        ))}
                    </DefaultTableBody>

                    {filterData.length > 0 && (
                        <NoMoreDataCell cellColSpan={9} />
                    )}
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UploadServerList
