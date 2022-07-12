/** No need unit test */
import React from 'react'
import { filter, find, map, reduce } from 'ramda'

import Box from '@mui/material/Box'
import {
    getGridSingleSelectOperators,
    GridCellParams,
    GridCellValue,
    GridColDef,
    GridColumnHeaderParams,
    GridPreProcessEditCellProps,
    GridRenderEditCellParams,
    GridValueGetterParams,
    useGridApiContext,
} from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import useTheme from '@mui/system/useTheme'
import { useDispatch, useSelector } from 'react-redux'
import EditOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Select from '@mui/material/Select'

import { RootState, Dispatch } from 'src/reducer/type'
import Breadcrumbs from 'src/component/breadcrumbs'
import { TProps, useT } from 'src/hooks/language'
import Grid from 'src/component/grid'
import TooltipField from 'src/component/grid/tooltipField'
import {
    slotInfoType,
    uploadServerType,
    diskInfoType,
} from 'src/reducer/uploadServer/type'
import { getCommonColumnsConfig } from 'src/module/uploadServer/detail/listView'
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity'
import {
    DiskInventoryStatusType,
    DiskOwnerType,
    DiskType,
} from 'src/reducer/disk/type'
import { langType } from 'src/hooks/language/package/type'

import StopUploadBtn from 'src/module/disk/list/stopUploadBtn'

const getMergeData = (allDisk: any, onServerDisk: any) => {
    let idx = 0
    const onServerDiskIDMap: Record<string, boolean> = {}

    const newOnServerDiskList = map((diskInfo: any) => {
        const matchDisk = find((disk: any) => {
            return disk.diskId === diskInfo.diskId
        }, allDisk)

        idx++

        if (matchDisk) {
            onServerDiskIDMap[diskInfo.diskId] = true

            return {
                ...matchDisk,
                ...diskInfo,
                unregistered: false,
                seq: idx,
                id: idx,
            }
        }

        return {
            ...diskInfo,
            unregistered: true,
            inventoryStatus: DiskInventoryStatusType.NORMAL,
            seq: idx,
            id: idx,
        }
    })(onServerDisk)

    return reduce((list: any[], disk: any) => {
        if (onServerDiskIDMap[disk.diskId]) {
            return list
        }

        idx++

        return [
            ...list,
            {
                ...disk,
                seq: idx,
                id: idx,
            },
        ]
    }, newOnServerDiskList)(allDisk)
}

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
                diskId: disk.diskId,
                serverID: item.uploadServerId,
            }
        })(filterData)

        return [...list, ...idList]
    }, [])(data)
}

const SelectEditInputCell = (props: any) => {
    const { id, value, field, options } = props
    const apiRef = useGridApiContext()

    const handleChange = async (event: any) => {
        await apiRef.current.setEditCellValue({
            id,
            field,
            value: parseInt(event.target.value),
        })
        apiRef.current.stopCellEditMode({ id, field })
    }

    return (
        <Select
            key={id}
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1, width: '100%' }}
            native
            autoFocus
        >
            {map(option => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                )
            }, options)}
        </Select>
    )
}

const SelecterFilter = (props: any) => {
    const t = useT()
    const { item, applyValue, options, focusElementRef } = props

    const ratingRef = React.useRef(null)

    const handleFilterChange = (e: any) => {
        applyValue({ ...item, value: parseInt(e.target.value) })
    }

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                pl: '20px',
            }}
        >
            <Select
                ref={ratingRef}
                name="custom-select-filter-operator"
                value={item.value}
                onChange={e => handleFilterChange(e)}
                size="small"
                sx={{ height: 1, width: '100%' }}
                native
                autoFocus
            >
                {map((option: { value: number; label: string }) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    )
                }, options)}
            </Select>
        </Box>
    )
}

const DiskList = () => {
    const theme = useTheme()
    const t = useT()
    const commonColumnsConfig = getCommonColumnsConfig(theme, t, ['row'])

    const diskData = useSelector((state: RootState) => state.disk)
    const uploadServerData = useSelector(
        (state: RootState) => state.uploadServer
    )
    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()
    const navigate = useNavigate()

    const transData = transformDiskData(uploadServerData.data, t)
    const mergeData = getMergeData(diskData.data, transData)

    const OwnerSelectOptions = [
        { label: t('nanShan'), value: DiskOwnerType.NANSHAN },
        { label: t('pinShan'), value: DiskOwnerType.PINGSHAN },
        { label: t('unknown'), value: DiskOwnerType.UNKNOWN },
    ]

    const InventoryStatusSelectOptions = [
        { label: t('normal'), value: DiskInventoryStatusType.NORMAL },
        { label: t('lost'), value: DiskInventoryStatusType.LOST },
        { label: t('damaged'), value: DiskInventoryStatusType.DAMAGED },
    ]

    const OwnerSelecterFilter = (props: any) => (
        <SelecterFilter {...props} options={OwnerSelectOptions} />
    )
    const InventoryStatusSelecterFilter = (props: any) => (
        <SelecterFilter {...props} options={InventoryStatusSelectOptions} />
    )

    const handleRefresh = () => {
        dispatch.disk.initData({})
    }

    const handleRecordsLogClick = (diskId: string) => {
        navigate(`/disk/recordsLog/${diskId}`)
    }

    const columns: GridColDef[] = [
        {
            field: 'seq',
            headerName: t('S/N'),
            minWidth: 100,
            type: 'number',
            sortable: true,
        },

        {
            field: 'serverID',
            headerName: `${t('server')}ID`,
            minWidth: 180,
            description: '',
            sortable: true,
            sortComparator: (v1: GridCellValue, v2: GridCellValue) =>
                (v1 as string)?.length - (v2 as string)?.length,
            renderCell: (params: GridValueGetterParams) => {
                if (params.row.serverID) {
                    return (
                        <Link
                            to={`/up/detail/${params.row.serverID}`}
                            style={{
                                color: theme.palette.primary.dark,
                            }}
                        >
                            {params.row.serverID}
                        </Link>
                    )
                }
                return '-'
            },
            // valueGetter: (params: GridValueGetterParams) =>
            //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'disk_id',
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
        {
            field: 'diskName',
            headerName: t('diskName'),
            minWidth: 150,
            valueGetter: (params: GridValueGetterParams) => {
                return params.row.diskName || '-'
            },
            renderCell: (params: GridValueGetterParams) => {
                return params.row.diskName || '-'
            },
        },
        {
            field: 'identified',
            headerName: t('identified'),
            minWidth: 110,
            type: 'singleSelect',
            valueOptions: ['T', 'F'],
            valueGetter: (params: GridValueGetterParams) => {
                const val = params.row.identified
                const text = val === true ? 'T' : val === false ? 'F' : '-'
                return text
            },
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.identified
                const text = val === true ? 'T' : val === false ? 'F' : '-'

                return (
                    <div
                        style={{
                            color:
                                val === true
                                    ? theme.palette.success.dark
                                    : val === false
                                    ? theme.palette.error.dark
                                    : 'inherit',
                        }}
                    >
                        {text}
                    </div>
                )
            },
        },

        {
            field: 'inventoryStatus',
            headerName: t('inventoryStatus'),
            minWidth: 150,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box>
                    {t('inventoryStatus')}
                    <EditOutlinedIcon
                        sx={{
                            // display: 'none',
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            width: 130,
            description: t('doubleClickToEdit'),
            sortable: true,
            editable: true,
            filterOperators: getGridSingleSelectOperators().map(
                (operator: any) => ({
                    ...operator,
                    InputComponent: InventoryStatusSelecterFilter,
                })
            ),
            renderEditCell: props => (
                <SelectEditInputCell
                    {...props}
                    options={InventoryStatusSelectOptions}
                />
            ),
            renderCell: (params: GridValueGetterParams) => {
                const val = params.row.inventoryStatus

                const text =
                    val === DiskInventoryStatusType.NORMAL
                        ? t('normal')
                        : val === DiskInventoryStatusType.LOST
                        ? t('lost')
                        : t('damaged')

                return (
                    <Box
                        sx={{
                            color:
                                params.row.inventoryStatus ===
                                DiskInventoryStatusType.NORMAL
                                    ? theme.palette.primary.dark
                                    : theme.palette.error.dark,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flex: 1,
                            cursor: 'text',
                            alignItems: 'center',
                            '& :hover': {
                                '&.MuiSvgIcon-root': {
                                    display: 'inline-block',
                                },
                            },
                        }}
                    >
                        {t(text as keyof langType)}
                    </Box>
                )
            },
        },

        {
            field: 'owner',
            headerName: t('owner'),
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    sx={{
                        width: 120,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {t('owner')}
                    <EditOutlinedIcon
                        sx={{
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            minWidth: 120,
            description: '',
            editable: true,
            sortable: true,
            // type: 'singleSelect',
            // valueOptions: [t('nanShan'), t('pinShan'), t('unknown')],

            filterOperators: getGridSingleSelectOperators().map(
                (operator: any) => ({
                    ...operator,
                    InputComponent: OwnerSelecterFilter,
                })
            ),
            renderEditCell: props => (
                <SelectEditInputCell {...props} options={OwnerSelectOptions} />
            ),
            // valueGetter: (params: GridValueGetterParams) => {
            //     const owner = params.row.owner

            //     const text =
            //         owner === DiskOwnerType.NANSHAN
            //             ? t('nanShan')
            //             : owner === DiskOwnerType.PINGSHAN
            //             ? t('pinShan')
            //             : t('unknown')

            //     return text
            // },
            // valueParser: (
            //     value: GridCellValue,
            //     params: GridCellParams<any, any, any> | undefined
            // ) => {
            //     const ownerVal =
            //         value === t('nanShan')
            //             ? DiskOwnerType.NANSHAN
            //             : value === t('pinShan')
            //             ? DiskOwnerType.PINGSHAN
            //             : DiskOwnerType.UNKNOWN

            //     return ownerVal
            // },
            renderCell: (params: GridValueGetterParams) => {
                const owner = params.row.owner

                const text =
                    owner === DiskOwnerType.NANSHAN
                        ? t('nanShan')
                        : owner === DiskOwnerType.PINGSHAN
                        ? t('pinShan')
                        : t('unknown')

                return text || '-'
            },
        },

        commonColumnsConfig.mountStatus,

        {
            field: 'updateTimeStr',
            headerName: t('lastUpdatedTime'),
            flex: 1,
            minWidth: 180,
            description: '',
            sortable: true,
            type: 'date',
            renderCell: (params: GridValueGetterParams) => {
                return params.row.updateTimeStr || '-'
            },
        },
        {
            field: 'slotId',
            headerName: `${t('slot')}ID`,
            minWidth: 100,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                return params.row.slotId || '-'
            },
        },

        commonColumnsConfig.uploadStatus,
        commonColumnsConfig.uploadProgress,

        {
            field: 'mountPoint',
            headerName: t('mountPoint'),
            flex: 1,
            minWidth: 160,
            description: '',
            sortable: true,
            renderCell: (params: GridValueGetterParams) => {
                const mountPoint = params.row.mountPoint
                if (mountPoint) {
                    return (
                        <TooltipField title={params.row.mountPoint}>
                            {mountPoint}
                        </TooltipField>
                    )
                }

                return '-'
            },
        },

        commonColumnsConfig.timeConsuming,
        commonColumnsConfig.vehicleIds,

        {
            field: 'comment',
            headerName: t('comment'),
            minWidth: 220,
            description: '',
            editable: true,
            sortable: true,
            renderHeader: (params: GridColumnHeaderParams) => (
                <Box
                    sx={{
                        width: 220,
                        display: 'flex',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {t('comment')}
                    <EditOutlinedIcon
                        sx={{
                            // display: 'none',
                            // width: 50,
                            marginLeft: 1,
                            fontSize: 12,
                            color: theme.palette.grey[600],
                        }}
                    />
                </Box>
            ),
            renderCell: (params: GridValueGetterParams) => {
                const comment = params.row.comment
                if (comment) {
                    return (
                        <TooltipField title={comment}>{comment}</TooltipField>
                    )
                }

                return '-'
            },
        },

        commonColumnsConfig.operationTips,

        {
            field: 'operation',
            headerName: t('operation'),
            minWidth: 400,
            renderCell: (params: GridValueGetterParams) => {
                const { diskId, serverID, uploadStatus } = params.row

                if (diskId) {
                    return (
                        <Box>
                            <Button
                                color="primary"
                                size="small"
                                onClick={() =>
                                    handleRecordsLogClick(params.row.diskId)
                                }
                            >
                                {t('recordsLog')}
                            </Button>

                            <StopUploadBtn
                                diskId={diskId}
                                serverId={serverID}
                                uploadStatus={uploadStatus}
                            />
                        </Box>
                    )
                }
            },
        },
    ]

    const saveGridConfig = (config: GridInitialStateCommunity) => {
        dispatch.userConfig.set({
            disk_listConfig: {
                ...userConfig.disk_listConfig,
                ...config,
            },
        })
    }

    const processRowUpdate = React.useCallback(
        async (newRow: DiskType, oldRow: DiskType) => {
            const { unregistered, owner, inventoryStatus, comment } = newRow

            if (unregistered) {
                dispatch.snackbar.push({
                    timeStamp: new Date().getTime(),
                    severity: 'error',
                    msg: t('unRegDiskCanNotEditTips'),
                })

                return oldRow
            }

            try {
                const rv = await dispatch.disk.changeDiskInfo({
                    newRow,
                    params: {
                        disk_sn: newRow.diskId,
                        owner,
                        on_server: newRow.onServer,
                        status: inventoryStatus,
                        comment,
                    },
                })

                if (rv) {
                    dispatch.snackbar.push({
                        timeStamp: new Date().getTime(),
                        severity: 'success',
                        msg: t('savedSuccessfully'),
                    })
                }
            } catch (error) {}

            return newRow
        },
        [mergeData]
    )

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
                rows={mergeData}
                columns={columns}
                quickFilter={true}
                // toolbarRight={() => (
                //     <Link to={'/disk/plugRecords'}>
                //         <Button
                //             sx={{
                //                 color: 'white',
                //                 background: 'rgb(52, 52, 52)',
                //                 paddingLeft: 2,
                //                 paddingRight: 2,
                //             }}
                //             color="primary"
                //         >
                //             {t('plugAndUnplugDiskRecords')}
                //         </Button>
                //     </Link>
                // )}
                saveGridConfig={saveGridConfig}
                initialState={userConfig.disk_listConfig}
                dataGridProps={{
                    processRowUpdate: processRowUpdate,
                    onProcessRowUpdateError: (error: any) => {
                        dispatch.snackbar.push({
                            timeStamp: new Date().getTime(),
                            severity: 'error',
                            msg: error.message,
                        })
                        console.error(error)
                    },
                    experimentalFeatures: { newEditingApi: true },
                }}
            />
        </Box>
    )
}

export default DiskList
