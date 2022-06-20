import React, { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import ListSubheader from '@mui/material/ListSubheader'
import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem'

import { DEFAULT_DATA_SOURCE } from 'src/reducer/userConfig'
import { DataSourceEnum } from 'src/reducer/userConfig/type'
import { useT } from 'src/hooks/language'
import { Dispatch, RootState } from 'src/reducer/type'

const DataSourceSelecter = () => {
    const theme = useTheme()

    const { lang } = useSelector((state: RootState) => state.language)
    const { dataSource } = useSelector((state: RootState) => state.userConfig)
    const dispatch = useDispatch<Dispatch>()
    const t = useT()

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const val = e.target.value

        dispatch.userConfig.set({
            dataSource: val as DataSourceEnum,
        })

        dispatch.uploadServer.initData({})

        navigate('/up')

        dispatch.snackbar.push({
            timeStamp: new Date().getTime(),
            severity: 'success',
            msg: t('switchedDataSource', t(val)),
        })
    }

    const ds = dataSource || DEFAULT_DATA_SOURCE

    return useMemo(() => {
        return (
            <Box
                sx={{
                    marginLeft: 1,
                }}
            >
                <Select
                    size={'small'}
                    value={ds}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0px solid !important',
                        },
                    }}
                >
                    <ListSubheader
                        sx={{ width: 200, background: theme.color.grey5 }}
                    >
                        {t('dataSource')}:
                    </ListSubheader>
                    <MenuItem
                        value={DataSourceEnum.guangZhou}
                        sx={{ paddingLeft: 5 }}
                    >
                        {t('guangZhou')}
                    </MenuItem>
                    <MenuItem
                        value={DataSourceEnum.shenZhen}
                        sx={{ paddingLeft: 5 }}
                    >
                        {t('shenZhen')}
                    </MenuItem>
                </Select>
            </Box>
        )
    }, [ds, lang])
}

export default DataSourceSelecter
