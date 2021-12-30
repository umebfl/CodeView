import React, { useState, FC } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { filter, includes, toLower } from 'ramda'

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
import { useT } from 'src/hooks/language'
import { langType } from 'src/reducer/language/package/type'

const UploadServerList: FC = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()
    const [searchText, setSearchText] = useState('')
    const t = useT()

    const filterData = filter((item: uploadServerType) => {
        const text = toLower(searchText)
        return (
            includes(text)(item.uploadServerId) ||
            includes(text)(item.uploadServerLocation) ||
            includes(text)(toLower(t(item.isRunningStr as keyof langType))) ||
            includes(text)(item.operationTips)
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
                data={[
                    {
                        name: 'Upload Server',
                        link: '/up',
                    },
                ]}
                desc={t('list')}
            ></Breadcrumbs>

            <FilterBar
                inputProps={{
                    placeholder: `ID/${t('runStatus')}/${t('position')}/${t(
                        'operationTips'
                    )}`,
                }}
                handleChange={setSearchText}
            />

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <DefaultTableCellHeaderCell align="center">
                                {t('S/N')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                ID
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                {t('runStatus')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell width={100}>
                                {t('emptySlots')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell
                                align="center"
                                width={100}
                            >
                                {t('completed')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell
                                align="center"
                                width={100}
                            >
                                {t('totalOfSlots')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                {t('position')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                {t('operationTips')}
                            </DefaultTableCellHeaderCell>
                            <DefaultTableCellHeaderCell align="center">
                                {t('operate')}
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
                                        {t(row.isRunningStr as keyof langType)}
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
                                        {t('viewMore')}
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
