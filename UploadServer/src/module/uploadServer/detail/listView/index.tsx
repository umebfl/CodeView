import React from 'react'

import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material'
import { path } from 'ramda'
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined'
import Tooltip from '@mui/material/Tooltip'

import {
    DefaultTableCellCell,
    DefaultTableCellHeaderCell,
    DefaultTableRow,
    DefaultTableBody,
    NoMoreDataCell,
} from 'src/component/table'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import { DiskStatusConfig, diskStatusEnum } from 'src/reducer/uploadServer/type'
import { useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    const t = useT()

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <DefaultTableCellHeaderCell align="center">
                            {t('S/N')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('slot')} ID
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('slotName')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            {t('disk')} ID
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            {t('diskName')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('mountStatus')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('diskStatus')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('mountPoint')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('updateTime')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            {t('vehicleInfo')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {t('operationTips')}
                                <Tooltip arrow title={t('noteMountStatus')}>
                                    <CircleNotificationsOutlinedIcon />
                                </Tooltip>
                            </Box>
                        </DefaultTableCellHeaderCell>
                    </TableRow>
                </TableHead>

                <DefaultTableBody>
                    {data.map((row, index) => (
                        <DefaultTableRow key={row.slotId}>
                            <DefaultTableCellCell align="center">
                                {index + 1}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.slotId}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.slotBusId}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                {row.diskInfo?.diskId || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                {row.diskInfo?.diskName || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell
                                align="center"
                                sx={{
                                    color: row.diskInfo
                                        ? row.diskInfo?.isMounted
                                            ? theme.palette.success.dark
                                            : theme.palette.error.dark
                                        : 'inherit',
                                }}
                            >
                                {row.diskInfo
                                    ? row.diskInfo?.isMounted
                                        ? t('mounted')
                                        : t('unmount')
                                    : '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell
                                align="center"
                                sx={{
                                    color: row.diskInfo
                                        ? (path(
                                              DiskStatusConfig[
                                                  row.diskInfo.diskStatus
                                              ].color
                                          )(theme) as string)
                                        : 'inherit',
                                }}
                            >
                                {t(
                                    DiskStatusConfig[
                                        row.diskInfo?.diskStatus ||
                                            diskStatusEnum.NULL
                                    ].name as keyof langType
                                )}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.diskInfo?.mountPoint || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.diskInfo?.updateTimeStr || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                {row.diskInfo?.vehicleIds.length
                                    ? row.diskInfo?.vehicleIds.join(', ')
                                    : '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                <Box
                                    sx={{
                                        color: theme.palette.primary.dark,
                                    }}
                                >
                                    {row.diskInfo?.tips}
                                </Box>
                            </DefaultTableCellCell>
                        </DefaultTableRow>
                    ))}
                </DefaultTableBody>

                {data.length > 0 && <NoMoreDataCell cellColSpan={11} />}
            </Table>
        </TableContainer>
    )
}

export default ListView
