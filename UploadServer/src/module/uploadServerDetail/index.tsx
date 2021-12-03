import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'

import { map, find } from 'ramda'
import { useNavigate, useParams } from 'react-router-dom'

import { info } from 'src/util/loger/index'
import Breadcrumbs from 'src/component/breadcrumbs'
import { serverType, slotInfoType } from 'src/reducer/uploadServer'
import { useEffect } from 'react'

interface payloadType {
    data: Array<serverType>
    dispatch: Function
}

interface GridViewPayloadType {
    data: slotInfoType[]
}

const GridView = ({ data }: GridViewPayloadType) => {
    return (
        <Box>
            {map((item: slotInfoType) => (
                <Box key={item.slotId} sx={{ color: 'white' }}>
                    {item.slotId}
                </Box>
            ))(data)}
        </Box>
    )
}

const UploadServerDetail = ({ data }: payloadType) => {
    info('UploadServerDetail render')
    const { id } = useParams()
    const theme = useTheme()
    const navigate = useNavigate()

    const detail = find((item: serverType) => item.uploadServerId === id)(data)

    useEffect(() => {
        if (!detail) {
            navigate('/up')
            console.log('xx')
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            }}
        >
            <Breadcrumbs>
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    {id}
                </Typography>
            </Breadcrumbs>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 1.5,
                    }}
                >
                    <Box>
                        {/* TODO cmp */}
                        <Input
                            size={'small'}
                            inputProps={{
                                maxLength: 50,
                                style: { paddingBottom: 0 },
                            }}
                            sx={{
                                background: theme.color.grey5,
                                paddingLeft: 1,
                                paddingRight: 1,
                                paddingTop: 0.5,
                                paddingBottom: 0.5,
                                fontSize: 14,
                                ':before': { borderBottom: 0 },
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <ManageSearchIcon />
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* TODO cmp */}
                        <GridViewOutlinedIcon
                            sx={{
                                color: theme.color.grey15,
                                cursor: 'pointer',
                                ': hover': {
                                    color: theme.color.grey20,
                                },
                            }}
                        ></GridViewOutlinedIcon>
                        <FormatListBulletedOutlinedIcon
                            sx={{
                                color: theme.color.grey15,
                                cursor: 'pointer',
                                ': hover': {
                                    color: theme.color.grey20,
                                },
                            }}
                        ></FormatListBulletedOutlinedIcon>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                    }}
                >
                    <GridView data={detail?.slotInfos || []}></GridView>
                </Box>
            </Box>
        </Box>
    )
}

export default UploadServerDetail
