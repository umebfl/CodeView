/** No need unit test */
import { useState } from 'react'
import {
    find,
    filter,
    includes,
    map,
    compose,
    toLower,
    anyPass,
    curry,
} from 'ramda'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { useTheme } from '@mui/material/styles'

import Breadcrumbs from 'src/component/breadcrumbs'
import {
    uploadServerType,
    slotInfoType,
    diskStatusEnum,
} from 'src/reducer/uploadServer/type'
import { RootState, Dispatch } from 'src/reducer/type'

import GridView from 'src/module/uploadServer/detail/gridView'
import ListView from 'src/module/uploadServer/detail/listView'
import FilterBar from 'src/component/filterBar'
import { ViewType } from 'src/module/uploadServer/detail/type'

import { useT } from 'src/hooks/language'
import { langType } from 'src/hooks/language/package/type'

const isInclude = curry((list: string, s: string) => {
    const llist = toLower(list)
    const ls = toLower(s)
    return includes(llist)(ls)
})

const UploadServerDetail = () => {
    const { id } = useParams()
    const theme = useTheme()
    const { data } = useSelector((state: RootState) => state.uploadServer)
    const userConfig = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()
    const t = useT()

    const [searchText, setSearchText] = useState('')

    const handleViewTypeChange = (type: ViewType) => {
        dispatch.userConfig.set({
            ...userConfig,
            uploadServer: {
                ...userConfig.uploadServer,
                viewType: type,
            },
        })
    }

    const detail = compose(
        (upServer: uploadServerType | undefined) => {
            return upServer
                ? {
                      ...upServer,
                      slotInfos: map((slot: slotInfoType) => ({
                          ...slot,
                          ...(slot.diskInfo
                              ? {
                                    diskInfo: {
                                        ...slot.diskInfo,

                                        // TODO: lang
                                        tips: slot.diskInfo.wrongServer
                                            ? `${t(
                                                  'pleasePlugThisHardDiskInto'
                                              )}: ${
                                                  slot.diskInfo
                                                      .recommendedServerId
                                              }`
                                            : slot.diskInfo.diskStatus ===
                                              diskStatusEnum.FORMATTED
                                            ? t('pleaseUnplugTheHardDisk')
                                            : slot.diskInfo?.invalidMsg,
                                    },
                                }
                              : undefined),
                      }))(upServer.slotInfos),
                  }
                : undefined
        },
        find((item: uploadServerType) => item.uploadServerId === id)
    )(data)

    const isIncludeSearch = isInclude(searchText)

    const slotInfos: slotInfoType[] = searchText.length
        ? filter((item: slotInfoType) => {
              if (isIncludeSearch(item.slotBusId)) {
                  return true
              }

              if (item.diskInfo) {
                  return anyPass([
                      info => isIncludeSearch(info.diskName),
                      info => isIncludeSearch(info.tips),
                      info => isIncludeSearch(info.updateTimeStr),
                      info => isIncludeSearch(info.mountPoint),
                      info =>
                          isIncludeSearch(
                              t(info.diskStatusStr as keyof langType)
                          ),
                      info => isIncludeSearch(info.vehicleIds.join(',')),
                  ])(item.diskInfo)
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
            <Breadcrumbs
                handleRefresh={dispatch.uploadServer.initData}
                data={[
                    {
                        name: 'Upload Server',
                        link: '/up',
                    },
                    {
                        name: id as string,
                        link: '/up',
                    },
                ]}
                desc={t('slotList')}
            />

            <FilterBar
                inputProps={{
                    placeholder: `ID/${t('slotList')}/${t('vehicle')}/${t(
                        'mountPoint'
                    )}`,
                }}
                handleChange={setSearchText}
                right={
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {userConfig.uploadServer.viewType === ViewType.list ? (
                            <GridViewOutlinedIcon
                                onClick={() =>
                                    handleViewTypeChange(ViewType.grid)
                                }
                                sx={{
                                    color: theme.color.grey15,
                                    cursor: 'pointer',
                                    ': hover': {
                                        color: theme.color.grey20,
                                    },
                                }}
                            ></GridViewOutlinedIcon>
                        ) : (
                            <FormatListBulletedOutlinedIcon
                                onClick={() =>
                                    handleViewTypeChange(ViewType.list)
                                }
                                sx={{
                                    color: theme.color.grey15,
                                    cursor: 'pointer',
                                    ': hover': {
                                        color: theme.color.grey20,
                                    },
                                }}
                            ></FormatListBulletedOutlinedIcon>
                        )}
                    </Box>
                }
            />

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
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    {detail ? (
                        userConfig.uploadServer.viewType === ViewType.list ? (
                            <ListView data={slotInfos}></ListView>
                        ) : (
                            <GridView data={slotInfos}></GridView>
                        )
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
                            {t('noMatchingUploadServer')}[{id}]
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default UploadServerDetail
