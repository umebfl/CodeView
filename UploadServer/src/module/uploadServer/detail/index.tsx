import { useEffect, useState } from 'react'
import { find, filter, includes, trim } from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'

import { info } from 'src/util/loger'
import Breadcrumbs from 'src/component/breadcrumbs'
import { uploadServerType, slotInfoType } from 'src/reducer/uploadServer/type'
import { RootState, Dispatch } from 'src/reducer/type'

// import GridView from 'src/module/uploadServer/detail/gridView'
import ListView from 'src/module/uploadServer/detail/listView'

const UploadServerDetail = () => {
    info('UploadServerDetail render')
    const { id } = useParams()
    const theme = useTheme()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const dispatch = useDispatch<Dispatch>()

    const [searchText, setSearchText] = useState('')

    const loadData = () => {
        dispatch.uploadServer.initData()
    }

    useEffect(() => {
        if (!detail) {
            dispatch.uploadServer.initData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const detail = find((item: uploadServerType) => item.uploadServerId === id)(
        data
    )

    const slotInfos: slotInfoType[] = searchText.length
        ? filter((item: slotInfoType) => {
              if (includes(searchText)(item.slotBusId)) {
                  return true
              }

              if (item.diskInfo) {
                  return (
                      includes(searchText)(item.diskInfo.diskId) ||
                      includes(searchText)(item.diskInfo.diskName) ||
                      includes(searchText)(item.diskInfo.diskStatusStr) ||
                      includes(searchText)(item.diskInfo.updateTimeStr) ||
                      includes(searchText)(item.diskInfo.vehicleIds.join(','))
                  )
              }

              return false
          })(detail?.slotInfos || [])
        : detail?.slotInfos || []

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'hidden',
            }}
        >
            <Breadcrumbs handleRefresh={loadData}>
                <Box>Upload Server</Box>
                <Typography color="text.primary" fontSize={14}>
                    {id}
                </Typography>
                <Typography fontSize={13}>插槽列表</Typography>
            </Breadcrumbs>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 1.5,
                        borderBottom: theme.borderLine.lightSolid,
                    }}
                >
                    <Box>
                        {/* TODO cmp */}
                        <Input
                            size={'small'}
                            placeholder="ID/名称/车辆..."
                            inputProps={{
                                maxLength: 50,
                                style: { paddingBottom: 0 },
                            }}
                            value={searchText}
                            onChange={e => setSearchText(trim(e.target.value))}
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
                                    <SearchOutlinedIcon fontSize={'small'} />
                                </InputAdornment>
                            }
                        />
                    </Box>
                    {/* <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
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
                    </Box> */}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    {detail ? (
                        // <GridView data={detail?.slotInfos || []}></GridView>
                        <ListView data={slotInfos}></ListView>
                    ) : (
                        <Box
                            sx={{
                                color: theme.color.grey15,
                                display: 'flex',
                                marginTop: 10,
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            No matching upload server.
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default UploadServerDetail
