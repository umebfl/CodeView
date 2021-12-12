import { map } from 'ramda'
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined'

import { Box, Typography, useTheme } from '@mui/material'

import NoMoreData from 'src/component/noMoreData'
import { slotInfoType } from 'src/reducer/uploadServer/type'
import { ViewPayloadType } from 'src/module/uploadServer/detail/type'

const GridView = ({ data }: ViewPayloadType) => {
    console.log(data)
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                overflow: 'hidden',
                padding: 1.5,
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
                                height: 110,
                                padding: 1.5,
                                minWidth: 300,
                                // flexGrow: 1,
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
                                    cursor: 'pointer',
                                    backgroundColor: item.isEmpty
                                        ? 'grey'
                                        : 'green',
                                }}
                            >
                                <Typography variant="h4" display="inline-block">
                                    {item.slotId}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="inline-block"
                                >
                                    ({item.slotBusId})
                                </Typography>
                                {item.diskInfo ? (
                                    <Box>
                                        <Box>
                                            <SaveOutlinedIcon />
                                            {item.diskInfo.diskName}
                                        </Box>
                                        <Box>
                                            <DirectionsCarFilledOutlinedIcon />
                                            {item.diskInfo.vehicleIds}
                                        </Box>
                                    </Box>
                                ) : (
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
                    ))(data)}

                    <NoMoreData />
                </Box>
            </Box>
        </Box>
    )
}

export default GridView
