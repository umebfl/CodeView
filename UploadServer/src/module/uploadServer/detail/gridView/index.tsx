import React, { FC } from 'react'

import { cond, equals, map, path } from 'ramda'
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined'
import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material'

import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import DiscFullOutlinedIcon from '@mui/icons-material/DiscFullOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import NoMoreData from 'src/component/noMoreData'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import {
    diskInfoType,
    DiskStatusConfig,
    diskStatusEnum,
    slotInfoType,
} from 'src/reducer/uploadServer/type'
import { EmptyDataMsg } from 'src/component/table'
import TooltipText from 'src/module/uploadServer/detail/gridView/tooltipText'
import { useT } from 'src/hooks/language'
import { langType } from 'src/reducer/language/package/type'

const iconSXProps: SxProps<Theme> = {
    fontSize: 48,
}

const IconMap: Record<string, any> = {
    UploadOutlinedIcon: <UploadOutlinedIcon sx={iconSXProps} />,
    CloudDoneOutlinedIcon: <CloudDoneOutlinedIcon sx={iconSXProps} />,
    ReportGmailerrorredOutlinedIcon: (
        <ReportGmailerrorredOutlinedIcon sx={iconSXProps} />
    ),
    DiscFullOutlinedIcon: <DiscFullOutlinedIcon sx={iconSXProps} />,
    CheckCircleOutlineIcon: <CheckCircleOutlineIcon sx={iconSXProps} />,
    ErrorOutlineOutlinedIcon: <ErrorOutlineOutlinedIcon sx={iconSXProps} />,
    null: null,
}

const GridView = ({ data }: ViewPayloadType) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                overflow: 'hidden',
                paddingTop: 0,
                paddingBottom: 0,
                borderTop: theme.borderLine.lightSolid,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                {data.length ? (
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            overflowY: 'auto',
                            paddingRight: 0.1,
                            alignContent: 'flex-start',
                        }}
                    >
                        {map((item: slotInfoType) => (
                            <GridItem key={item.slotId} item={item} />
                        ))(data)}
                        <NoMoreData />
                    </Box>
                ) : (
                    <EmptyDataMsg />
                )}
            </Box>
        </Box>
    )
}

const GridItem = ({ item }: { item: slotInfoType }) => {
    const theme = useTheme()

    return (
        <Box
            key={item.slotId}
            sx={{
                display: 'flex',
                color: 'white',
                height: 140,
                padding: 1,
                minWidth: 300,
                flexBasis: {
                    xs: '100%',
                    sm: '50%',
                    md: '40%',
                    lg: '30%',
                    xl: '15%',
                },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    border: theme.borderLine.lightSolid,
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: item.isEmpty
                        ? 'grey'
                        : item.diskInfo
                        ? (path(
                              DiskStatusConfig[item.diskInfo.diskStatus].color
                          )(theme) as string)
                        : 'green',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                        }}
                    >
                        <SlotInfo id={item.slotId} busId={item.slotBusId} />

                        <DiskInfo data={item.diskInfo} />
                    </Box>

                    <Status
                        data={item.diskInfo?.diskStatus}
                        updateTimeShortStr={item.diskInfo?.updateTimeShortStr}
                    ></Status>
                </Box>

                <Tips data={item.diskInfo?.tips} />
                <EmptySlot show={!item.diskInfo} />
            </Box>
        </Box>
    )
}

const DiskInfo = ({ data }: { data?: diskInfoType }) => {
    const t = useT()

    return data ? (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <SaveOutlinedIcon />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TooltipText
                        // showlen={20}
                        title={`${t('disk')} ID: ${data?.diskId}`}
                    >
                        <Box
                            sx={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            {data?.diskName}
                        </Box>
                    </TooltipText>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 0.5,
                }}
            >
                <DirectionsCarFilledOutlinedIcon />

                <TooltipText
                    showlen={20}
                    title={data?.vehicleIds.join(',') || ''}
                >
                    <Box
                        sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            width: 100,
                        }}
                    >
                        {data?.vehicleIds.join(',')}
                    </Box>
                </TooltipText>
            </Box>
        </>
    ) : null
}

const SlotInfo = ({ id, busId }: { id: number; busId: string }) => {
    const t = useT()
    return (
        <Box>
            <TooltipText title={`${t('slot')} ID:${busId}`}>
                <Typography variant="h4" display="inline-block">
                    {id}
                </Typography>
            </TooltipText>
        </Box>
    )
}

const Status = ({
    data,
    updateTimeShortStr,
}: {
    data?: diskStatusEnum
    updateTimeShortStr?: string
}) => {
    const t = useT()
    return (
        <Box>
            {data && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {IconMap[DiskStatusConfig[data].icon]}

                    <TooltipText
                        title={`${t('updateTime')}: ${
                            updateTimeShortStr || '-'
                        }`}
                    >
                        <Box
                            sx={{
                                fontSize: 14,
                            }}
                        >
                            {t(DiskStatusConfig[data].name as keyof langType)}
                        </Box>
                    </TooltipText>
                </Box>
            )}
        </Box>
    )
}

const Tips = ({ data }: { data?: string }) => {
    return data ? (
        <TooltipText showlen={20} title={data}>
            <Box
                sx={{
                    fontSize: 14,
                    height: 14,
                    lineHeight: 1,
                    borderLeft: '4px solid white',
                    paddingLeft: 1,
                    marginTop: 1,
                }}
            >
                {data}
            </Box>
        </TooltipText>
    ) : null
}

const EmptySlot = ({ show }: { show: boolean }) => {
    const theme = useTheme()
    const t = useT()

    return show ? (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: 2,
                fontSize: 13,
                color: theme.color.grey8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ClosedCaptionDisabledOutlinedIcon />
            {t('hardDiskNotInserted')}
        </Box>
    ) : null
}

export default GridView
