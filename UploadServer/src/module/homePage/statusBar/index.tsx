import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { SxProps, Theme, useTheme } from '@mui/material/styles'
import TranslateIcon from '@mui/icons-material/Translate'

import { version } from '../../../../package.json'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from 'src/reducer/type'

interface LightBoxType {
    children: any
    sx?: SxProps<Theme>
    onClick?: () => void
}

const LightBox: FC<LightBoxType> = ({
    children,
    sx,
    ...props
}: LightBoxType) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                paddingRight: 1,
                paddingLeft: 1,
                ': hover': {
                    background: theme.color.grey5,
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    )
}

const LanguageBox = () => {
    const { lang } = useSelector((state: RootState) => state.language)
    const dispatch = useDispatch<Dispatch>()

    const hanelClick = () => {
        dispatch.language.switchLang()
    }

    return (
        <LightBox
            sx={{ cursor: 'pointer', justifyContent: 'center' }}
            onClick={hanelClick}
        >
            <TranslateIcon fontSize="small" />
            <Box
                sx={{
                    marginLeft: 0.3,
                    textAlign: 'center',
                }}
            >
                {lang}
            </Box>
        </LightBox>
    )
}

const VersionBox = () => {
    return <LightBox>Version: {version}</LightBox>
}

const StatusBar = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                background: theme.color.grey2,
                height: 26,
                color: theme.color.grey15,
                fontSize: 14,
                borderTop: theme.borderLine.lightSolid,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: 1,
                paddingLeft: 1,
                overflow: 'hidden',
            }}
        >
            <LanguageBox />
            <VersionBox />
        </Box>
    )
}

export default StatusBar
