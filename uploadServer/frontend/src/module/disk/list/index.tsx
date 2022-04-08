/** No need unit test */
import React from 'react'

import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip'
import {
    GridColDef,
    GridEditCellProps,
    GridPreProcessEditCellProps,
    GridValueGetterParams,
} from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import useTheme from '@mui/system/useTheme'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState, Dispatch } from 'src/reducer/type'
import { useT } from 'src/hooks/language'
import Grid from 'src/component/grid'
import TooltipField from 'src/component/grid/tooltipField'
import { filter, map, reduce } from 'ramda'
import {
    slotInfoType,
    uploadServerType,
    diskInfoType,
} from 'src/reducer/uploadServer/type'

const transformDiskData = (data: uploadServerType[]) => {
    let i = 0

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
                id: disk.diskId + i++,
                serverID: item.uploadServerId,
                inventoryStatus: '在库',
            }
        })(filterData)

        return [...list, ...idList]
    }, [])(data)
}

const DiskList = () => {
    const dispatch = useDispatch<Dispatch>()
    const theme = useTheme()
    const t = useT()
    // const { data } = useSelector((state: RootState) => state.disk)
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const transData = transformDiskData(data)
    console.log(transData)

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
            width: 130,
            description: '双击库存状态可进行编辑',
            sortable: true,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['在库', '丢失', '损坏'],
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
                            params.row.inventoryStatus === '在库'
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
                    {params.row.inventoryStatus}
                    {/* <EditOutlinedIcon
                        sx={{ fontSize: 12, color: theme.palette.grey[600] }}
                    /> */}
                </Box>
            ),
        },
        {
            field: 'mountStatus',
            headerName: '挂载状态',
            width: 130,
            description: '',
            sortable: true,
            type: 'singleSelect',
            valueOptions: ['已挂载', '未挂载'],
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.isMounted ? '已挂载' : '未挂载'
            },
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color: params.row.isMounted
                            ? theme.palette.success.dark
                            : 'inherit',
                    }}
                >
                    {params.row.isMounted ? '已挂载' : '未挂载'}
                </Box>
            ),
        },
        {
            field: 'LastMountTime',
            headerName: '最后挂载时间',
            width: 130,
            description: '',
            sortable: true,
            type: 'date',
        },
        {
            field: 'slotId',
            headerName: '插槽ID',
            width: 130,
            description: '',
            sortable: true,
        },
        {
            field: 'diskStatus',
            headerName: '上传状态',
            width: 180,
            description: '',
            sortable: true,
            type: 'singleSelect',
            valueOptions: [
                '等待上传',
                '上传中',
                '上传失败',
                '上传完成',
                '异常',
                '结束',
            ],
        },
        {
            field: 'uploadProgress',
            headerName: '上传进度',
            width: 130,
            description: '',
            sortable: true,
            type: 'number',
        },
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
        {
            field: 'timeConsuming',
            headerName: '耗时',
            width: 130,
            description: '',
            sortable: true,
            type: 'number',
        },
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
        {
            field: 'operationTips',
            headerName: t('operationTips'),
            width: 260,
            type: 'string',
            sortable: true,
            description: t('noteMountStatus'),
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.tips || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                const tips = params.row.tips

                if (tips?.length) {
                    return (
                        <TooltipField title={tips}>
                            <Box
                                sx={{
                                    color: theme.palette.primary.dark,
                                }}
                            >
                                {tips}
                            </Box>
                        </TooltipField>
                    )
                }

                return '-'
            },
        },
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
