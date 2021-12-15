import React from 'react'

import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from '@mui/material'
import { path } from 'ramda'
import {
    DefaultTableCellCell,
    DefaultTableCellHeaderCell,
    DefaultTableRow,
    DefaultTableBody,
    NoMoreDataCell,
} from 'src/component/table'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import { DiskStatusConfig, diskStatusEnum } from 'src/reducer/uploadServer/type'

const ListView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <DefaultTableCellHeaderCell align="center">
                            序号
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            插槽ID
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            插槽名称
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            磁盘ID
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            磁盘名称
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            磁盘状态
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="center">
                            更新时间
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            车辆信息
                        </DefaultTableCellHeaderCell>
                        <DefaultTableCellHeaderCell align="left">
                            操作提示
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
                                        ? (path(
                                              DiskStatusConfig[
                                                  row.diskInfo.diskStatus
                                              ].color
                                          )(theme) as string)
                                        : 'inherit',
                                }}
                            >
                                {
                                    DiskStatusConfig[
                                        row.diskInfo?.diskStatus ||
                                            diskStatusEnum.NULL
                                    ].name
                                }
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="center">
                                {row.diskInfo?.updateTimeStr || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                {row.diskInfo?.vehicleIds.join(', ') || '-'}
                            </DefaultTableCellCell>
                            <DefaultTableCellCell align="left">
                                {row.diskInfo?.tips}
                            </DefaultTableCellCell>
                        </DefaultTableRow>
                    ))}
                </DefaultTableBody>

                {data.length > 0 && <NoMoreDataCell cellColSpan={9} />}
            </Table>
        </TableContainer>
    )
}

export default ListView
