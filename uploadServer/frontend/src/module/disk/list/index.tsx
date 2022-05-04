/** No need unit test */
import React from 'react'
import { filter, map, reduce } from 'ramda'

import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import {
    GridCellValue,
    GridColDef,
    GridValueGetterParams,
} from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import useTheme from '@mui/system/useTheme'

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
    let idx = 1
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
                seq: idx++,
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
            field: 'seq',
            headerName: t('S/N'),
            width: 100,
            type: 'string',
            sortable: true,
        },

        {
            field: 'serverID',
            headerName: `${t('server')}ID`,
            width: 180,
            description: '',
            sortable: true,
            sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
                (v1 as string)?.length - (v2 as string)?.length,
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
        {
            field: 'id',
            headerName: `${t('disk')}ID`,
            flex: 1,
            minWidth: 260,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskId || '-'
            },
            renderCell: (params: GridValueGetterParams) =>
                params.row.diskId ? (
                    <TooltipField title={params.row.diskId}>
                        {params.row.diskId}
                    </TooltipField>
                ) : (
                    '-'
                ),
        },
        { field: 'diskName', headerName: t('diskName'), width: 130 },
        {
            field: 'inventoryStatus',
            headerName: t('inventoryStatus'),
            width: 110,
            description: t('doubleClickToEdit'),
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
            headerName: t('lastUpdatedTime'),
            width: 180,
            description: '',
            sortable: true,
            type: 'date',
        },
        {
            field: 'slotId',
            headerName: `${t('slot')}ID`,
            width: 90,
            description: '',
            sortable: true,
        },

        commonColumnsConfig.diskStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: t('mountPoint'),
            flex: 1,
            minWidth: 160,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => (
                <TooltipField title={params.row.mountPoint}>
                    {params.row.mountPoint}
                </TooltipField>
            ),
        },

        commonColumnsConfig.timeConsuming,
        commonColumnsConfig.vehicleIds,

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
                // toolbarRight={() => (
                //     <Link to={'/disk/records'}>
                //         <Button
                //             sx={{
                //                 color: 'white',
                //                 background: 'rgb(52, 52, 52)',
                //                 paddingLeft: 2,
                //                 paddingRight: 2,
                //             }}
                //             color="primary"
                //             // 跳转到plugAndUnplugDiskRecords页面
                //             onClick={() => {}}
                //         >
                //             {t('plugAndUnplugDiskRecords')}
                //         </Button>
                //     </Link>
                // )}
                initialState={{
                    // sorting: {
                    //     sortModel: [{ field: 'serverID', sort: 'asc' }],
                    // },
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
