/** No need unit test */
import React from 'react'

import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import useTheme from '@mui/system/useTheme'
import { filter, map, reduce } from 'ramda'

import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState } from 'src/reducer/type'
import { TProps, useT } from 'src/hooks/language'
import Grid from 'src/component/grid'
import TooltipField from 'src/component/grid/tooltipField'
import {
    slotInfoType,
    uploadServerType,
    diskInfoType,
} from 'src/reducer/uploadServer/type'
import { getCommonColumnsConfig } from 'src/module/uploadServer/detail/listView'

const transformDiskData = (data: uploadServerType[], t: TProps) => {
    return reduce((list: any[], item: uploadServerType) => {
        const diskList = map((slot: slotInfoType) => {
            return slot.diskInfo
        })(item.slotInfos)

        const filterData = filter((disk: diskInfoType | undefined) => {
            return !!disk
        })(diskList) as diskInfoType[]

        const idList = map((disk: diskInfoType) => {
            return {
                ...disk,
                id: disk.diskId,
                serverID: item.uploadServerId,
                inventoryStatus: 'normal',
            }
        })(filterData)

        return [...list, ...idList]
    }, [])(data)
}

const DiskList = () => {
    const theme = useTheme()
    const t = useT()

    const commonColumnsConfig = getCommonColumnsConfig(theme, t, ['row'])

    // const { data } = useSelector((state: RootState) => state.disk)
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const transData = transformDiskData(data, t)

    const handleRefresh = () => {}

    const columns: GridColDef[] = [
        {
            field: 'serverID',
            headerName: '服务器ID',
            width: 180,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => (
                <Link
                    to={`/up/detail/${params.row.serverID}`}
                    style={{
                        color: theme.palette.primary.dark,
                    }}
                >
                    {params.row.serverID}
                </Link>
            ),
            // valueGetter: (params: GridValueGetterParams) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'id', headerName: '硬盘ID', width: 240 },
        { field: 'diskName', headerName: '硬盘名称', width: 130 },
        {
            field: 'inventoryStatus',
            headerName: '库存状态',
            width: 110,
            description: '双击库存状态可进行编辑',
            sortable: true,
            // editable: true,
            type: 'singleSelect',
            valueOptions: ['normal', 'lose', 'damage'],
            // preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
            //     dispatch.disk.changeDiskInventoryStatus({
            //         diskID: params.row.id,
            //         status: params.props.value,
            //     })

            //     return {
            //         value: params.props.value,
            //     }
            // },
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color:
                            params.row.inventoryStatus === 'normal'
                                ? theme.palette.primary.dark
                                : 'red',
                        // display: 'flex',
                        // flexDirection: 'row',
                        // justifyContent: 'space-around',
                        // flex: 1,
                        // cursor: 'text',
                        // alignItems: 'center',
                    }}
                >
                    {t(params.row.inventoryStatus)}
                    {/* <EditOutlinedIcon
                        sx={{ fontSize: 12, color: theme.palette.grey[600] }}
                    /> */}
                </Box>
            ),
        },

        commonColumnsConfig.mountStatus,

        {
            field: 'updateTimeStr',
            headerName: '最近更新时间',
            width: 180,
            description: '',
            sortable: true,
            type: 'date',
        },
        {
            field: 'slotId',
            headerName: '插槽ID',
            width: 90,
            description: '',
            sortable: true,
        },

        commonColumnsConfig.diskStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: '挂载路径',
            width: 160,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => (
                <TooltipField title={params.row.mountPoint}>
                    {params.row.mountPoint}
                </TooltipField>
            ),
        },

        commonColumnsConfig.timeConsuming,

        {
            field: 'vehicleIds',
            headerName: '车辆',
            width: 180,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                const vehicleIds = params.row.vehicleIds?.length
                    ? params.row.vehicleIds.join(', ')
                    : '-'

                return (
                    <TooltipField title={vehicleIds}>{vehicleIds}</TooltipField>
                )
            },
        },

        commonColumnsConfig.operationTips,
    ]

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
                handleRefresh={handleRefresh}
                data={[
                    {
                        name: 'Disk',
                        link: '/disk',
                    },
                ]}
                desc={t('list')}
            ></Breadcrumbs>

            <Grid
                rows={transData}
                columns={columns}
                quickFilter={true}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'serverID', sort: 'asc' }],
                    },
                    filter: {
                        filterModel: {
                            items: [
                                // {
                                //     columnField: 'mountStatus',
                                //     operatorValue: 'is',
                                //     value: '已挂载',
                                // },
                            ],
                        },
                    },
                }}
            />
        </Box>
    )
}

export default DiskList
