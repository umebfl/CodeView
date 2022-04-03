/** No need unit test */
import React from 'react'

import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import useTheme from '@mui/system/useTheme'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import Breadcrumbs from 'src/component/breadcrumbs'
import { RootState, Dispatch } from 'src/reducer/type'
import { useT } from 'src/hooks/language'
import Grid from 'src/component/grid'

const DiskList = () => {
    const dispatch = useDispatch<Dispatch>()
    const theme = useTheme()
    const navigate = useNavigate()
    const t = useT()

    const handleRefresh = () => {}

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: '序号',
            width: 70,
            type: 'number',
        },
        { field: 'diskID', headerName: '硬盘ID', width: 170 },
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
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color:
                            params.row.inventoryStatus === '在库'
                                ? theme.palette.primary.dark
                                : 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flex: 1,
                        cursor: 'text',
                        alignItems: 'center',
                    }}
                >
                    {params.row.inventoryStatus}
                    <EditOutlinedIcon
                        sx={{ fontSize: 12, color: theme.palette.grey[600] }}
                    />
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
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        color:
                            params.row.mountStatus === '已挂载'
                                ? theme.palette.success.dark
                                : 'inherit',
                    }}
                >
                    {params.row.mountStatus}
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
            field: 'serverID',
            headerName: '服务器ID',
            width: 160,
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
                <Box
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    <Tooltip
                        placement="bottom"
                        title={params.row.mountPoint}
                        arrow
                    >
                        <Box
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {params.row.mountPoint}
                        </Box>
                    </Tooltip>
                </Box>
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
            renderCell: (params: GridValueGetterParams) => (
                <Box
                    sx={{
                        overflow: 'hidden',
                    }}
                >
                    <Tooltip
                        placement="bottom"
                        title={params.row.vehicleIds}
                        arrow
                    >
                        <Box
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {params.row.vehicleIds}
                        </Box>
                    </Tooltip>
                </Box>
            ),
        },
    ]

    const oriData = [
        {
            id: 1,
            diskID: 'S6P7SDFDS66789L',
            diskName: 'nvme0n4',
            serverID: 'superxray-sz-006',
            slotId: 4,
            mountPoint: '/roadtest_disks/nvme3n2_A0764CB0',
            inventoryStatus: '在库',
            mountStatus: '已挂载',
            LastMountTime: '2022-03-25',
            diskStatus: 'WAITING_TO_UPLOAD',
            uploadProgress: 20,

            diskPlugTime: '2022-03-25 13:00:00',
            startUploadTime: '2022-03-25 14:00:00',
            endUploadTime: '',

            vehicleIds: [
                'byd-cn-0',
                'byd-cn-2',
                'byd-cn-3',
                'byd-cn-4',
                'byd-cn-5',
            ].join(','),
            allRecords: [
                'byd-cn-9_20210730_2021-07-30-15-19-11',
                'byd-cn-9_20210730_2021-07-30-15-19-12',
                'byd-cn-9_20210730_2021-07-30-15-19-13',
                'byd-cn-9_20210730_2021-07-30-15-19-14',
            ],
            waitingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-14'],
            uploadingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-12'],
            finishedRecords: ['byd-cn-9_20210730_2021-07-30-15-19-11'],

            timeConsuming: 2,
        },
        {
            id: 2,
            diskID: 'S6P7SDFDS66789L2',
            diskName: 'nvme0n42',
            serverID: 'superxray-sz-0062',
            slotId: 5,
            mountPoint: '/roadtest_disks/nvme3n2_A0764CB02',
            inventoryStatus: '在库',
            mountStatus: '已挂载',
            LastMountTime: '2022-03-26',
            diskStatus: 'WAITING_TO_UPLOAD',
            uploadProgress: 22,

            diskPlugTime: '2022-03-25 14:00:00',
            startUploadTime: '2022-03-25 15:00:00',
            endUploadTime: '',

            vehicleIds: [
                'byd-cn-1',
                'byd-cn-2',
                'byd-cn-3',
                'byd-cn-4',
                'byd-cn-5',
            ].join(','),
            allRecords: [
                'byd-cn-9_20210730_2021-07-30-15-19-11',
                'byd-cn-9_20210730_2021-07-30-15-19-12',
                'byd-cn-9_20210730_2021-07-30-15-19-13',
                'byd-cn-9_20210730_2021-07-30-15-19-14',
            ],
            waitingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-14'],
            uploadingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-12'],
            finishedRecords: ['byd-cn-9_20210730_2021-07-30-15-19-11'],

            timeConsuming: 3,
        },

        {
            id: 3,
            diskID: 'S6P7SDFDS66789L2',
            diskName: 'nvme0n42',
            serverID: 'superxray-sz-0062',
            slotId: 5,
            mountPoint: '/roadtest_disks/nvme3n2_A0764CB02',
            inventoryStatus: '丢失',
            mountStatus: '未挂载',
            LastMountTime: '2022-03-26',
            diskStatus: 'WAITING_TO_UPLOAD',
            uploadProgress: 22,

            diskPlugTime: '2022-03-25 14:00:00',
            startUploadTime: '2022-03-25 15:00:00',
            endUploadTime: '',

            vehicleIds: [
                'byd-cn-1',
                'byd-cn-2',
                'byd-cn-3',
                'byd-cn-4',
                'byd-cn-5',
            ].join(','),
            allRecords: [
                'byd-cn-9_20210730_2021-07-30-15-19-11',
                'byd-cn-9_20210730_2021-07-30-15-19-12',
                'byd-cn-9_20210730_2021-07-30-15-19-13',
                'byd-cn-9_20210730_2021-07-30-15-19-14',
            ],
            waitingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-14'],
            uploadingRecords: ['byd-cn-9_20210730_2021-07-30-15-19-12'],
            finishedRecords: ['byd-cn-9_20210730_2021-07-30-15-19-11'],

            timeConsuming: 3,
        },
    ]

    const rows = oriData

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

            <Grid rows={rows} columns={columns} quickFilter={true} />
        </Box>
    )
}

export default DiskList
