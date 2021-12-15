import React from 'react'

import { cond, equals, map, path, T } from 'ramda'
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined'
import { Box, Typography, useTheme } from '@mui/material'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import DiscFullOutlinedIcon from '@mui/icons-material/DiscFullOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import NoMoreData from 'src/component/noMoreData'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'
import {
    DiskStatusConfig,
    diskStatusEnum,
    slotInfoType,
} from 'src/reducer/uploadServer/type'
import { EmptyDataMsg } from 'src/component/table'
import TooltipText from 'src/module/uploadServer/detail/gridView/tooltipText'

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
                                                  DiskStatusConfig[
                                                      item.diskInfo.diskStatus
                                                  ].color
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
                                            <Box>
                                                <TooltipText
                                                    title={`插槽id:${item.slotBusId}`}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        display="inline-block"
                                                    >
                                                        {item.slotId}
                                                    </Typography>
                                                </TooltipText>
                                            </Box>

                                            {item.diskInfo && (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <SaveOutlinedIcon />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                            }}
                                                        >
                                                            <TooltipText
                                                                // showlen={20}
                                                                title={`硬盘id: ${item.diskInfo?.diskId}`}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        whiteSpace:
                                                                            'nowrap',
                                                                        textOverflow:
                                                                            'ellipsis',
                                                                        overflow:
                                                                            'hidden',
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .diskInfo
                                                                            ?.diskName
                                                                    }
                                                                </Box>
                                                            </TooltipText>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                            marginTop: 0.5,
                                                        }}
                                                    >
                                                        <DirectionsCarFilledOutlinedIcon />

                                                        <TooltipText
                                                            showlen={20}
                                                            title={item.diskInfo?.vehicleIds.join(
                                                                ','
                                                            )}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    whiteSpace:
                                                                        'nowrap',
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                    overflow:
                                                                        'hidden',
                                                                    width: 100,
                                                                }}
                                                            >
                                                                {item.diskInfo?.vehicleIds.join(
                                                                    ','
                                                                )}
                                                            </Box>
                                                        </TooltipText>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>

                                        <Box>
                                            {item.diskInfo && (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {cond([
                                                        [
                                                            (icon: string) =>
                                                                icon ===
                                                                'UploadOutlinedIcon',
                                                            () => (
                                                                <UploadOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [
                                                            equals(
                                                                'CloudDoneOutlinedIcon'
                                                            ),
                                                            () => (
                                                                <CloudDoneOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [
                                                            equals(
                                                                'ReportGmailerrorredOutlinedIcon'
                                                            ),
                                                            () => (
                                                                <ReportGmailerrorredOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [
                                                            equals(
                                                                'DiscFullOutlinedIcon'
                                                            ),
                                                            () => (
                                                                <DiscFullOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [
                                                            equals(
                                                                'ErrorOutlineOutlinedIcon'
                                                            ),
                                                            () => (
                                                                <ErrorOutlineOutlinedIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [
                                                            equals(
                                                                'CheckCircleOutlineIcon'
                                                            ),
                                                            () => (
                                                                <CheckCircleOutlineIcon
                                                                    sx={{
                                                                        fontSize: 48,
                                                                    }}
                                                                />
                                                            ),
                                                        ],
                                                        [T, () => null],
                                                    ])(
                                                        DiskStatusConfig[
                                                            item.diskInfo
                                                                ?.diskStatus ||
                                                                diskStatusEnum.NULL
                                                        ].icon
                                                    )}

                                                    <TooltipText
                                                        title={`更新时间: ${item.diskInfo.updateTimeShortStr}`}
                                                    >
                                                        <Box
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {
                                                                DiskStatusConfig[
                                                                    item
                                                                        .diskInfo
                                                                        ?.diskStatus ||
                                                                        diskStatusEnum.NULL
                                                                ].name
                                                            }
                                                        </Box>
                                                    </TooltipText>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>

                                    {item.diskInfo?.tips && (
                                        <TooltipText
                                            showlen={20}
                                            title={item.diskInfo?.tips}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: 14,
                                                    height: 14,
                                                    lineHeight: 1,
                                                    borderLeft:
                                                        '4px solid white',
                                                    paddingLeft: 1,
                                                    marginTop: 1,
                                                }}
                                            >
                                                {item.diskInfo?.tips}
                                            </Box>
                                        </TooltipText>
                                    )}

                                    <Box>
                                        {!item.diskInfo && (
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
                                                未插入硬盘
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
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

export default GridView
