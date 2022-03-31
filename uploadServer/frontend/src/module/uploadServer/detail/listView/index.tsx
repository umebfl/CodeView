import React from 'react'

import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material'
import { path } from 'ramda'
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined'
import Tooltip from '@mui/material/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'

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
import UploadRecordsList from 'src/module/uploadServer/detail/gridView/uploadRecordsList'

function LinearProgressWithLabel(props: any) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    const t = useT()
    console.log(data)

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
                            {t('uploadProgress')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('mountPoint')}
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            {t('timeConsuming')}
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
                                {row.diskInfo?.diskStatus ? (
                                    <Tooltip
                                        title={`${t('statusUpdateTime')}: ${
                                            row.diskInfo?.updateTimeStr || '-'
                                        }`}
                                    >
                                        <Box>
                                            {t(
                                                DiskStatusConfig[
                                                    row.diskInfo?.diskStatus ||
                                                        diskStatusEnum.NULL
                                                ].name as keyof langType
                                            )}
                                        </Box>
                                    </Tooltip>
                                ) : (
                                    '-'
                                )}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.diskInfo?.allRecords?.length ? (
                                    <UploadRecordsList
                                        waitingRecords={
                                            row.diskInfo?.waitingRecords
                                        }
                                        uploadingRecords={
                                            row.diskInfo?.uploadingRecords
                                        }
                                        finishedRecords={
                                            row.diskInfo?.finishedRecords
                                        }
                                        failedRecords={
                                            row.diskInfo?.failedRecords
                                        }
                                    >
                                        <Box>
                                            <LinearProgressWithLabel
                                                value={
                                                    row.diskInfo
                                                        ?.uploadFinishedRate
                                                }
                                            />
                                        </Box>
                                    </UploadRecordsList>
                                ) : (
                                    '-'
                                )}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.diskInfo?.mountPoint || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell
                                align="center"
                                sx={{ width: 100 }}
                            >
                                <Tooltip
                                    arrow
                                    placement="right"
                                    title={
                                        <Box>
                                            <Box>
                                                {t('diskPlugTime')}：
                                                {row.diskInfo?.diskPlugTime ||
                                                    '-'}
                                            </Box>
                                            <Box>
                                                {t('startUploadTime')}：
                                                {row.diskInfo
                                                    ?.startUploadTime || '-'}
                                            </Box>
                                            <Box>
                                                {t('endUploadTime')}：
                                                {row.diskInfo?.endUploadTime ||
                                                    '-'}
                                            </Box>
                                        </Box>
                                    }
                                >
                                    <Box sx={{ display: 'inline-block' }}>
                                        {row.diskInfo?.timeConsuming?.length
                                            ? `${row.diskInfo?.timeConsuming}h`
                                            : '-'}
                                    </Box>
                                </Tooltip>
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

                {data.length > 0 && <NoMoreDataCell cellColSpan={12} />}
            </Table>
        </TableContainer>
    )
}

export default ListView
