import React from 'react'

import { addIndex, map } from 'ramda'

import { Box } from '@mui/system'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'

import { useKeyPress } from 'ahooks'

interface payloadType {
    children?: React.ReactNode
    allowBack?: boolean
    handleRefresh?: Function
    handleBeforeBack?: Function
    data: { name: string; link: string }[]
    desc?: string
}

const BreadcrumbsCmp = ({
    data,
    desc,
    allowBack = true,
    handleRefresh,
    handleBeforeBack,
}: payloadType) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const handleBack = async () => {
        handleBeforeBack && (await handleBeforeBack())
        const prevNode = data[data.length - 2] || data[0]
        navigate(prevNode.link)
    }

    useKeyPress('Backspace', e => {
        const target = e?.target as unknown as { nodeName: string } | undefined

        if (target?.nodeName === 'BODY') {
            handleBack()
        }
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.color.grey5}`,
                paddingLeft: 1,
                paddingRight: 1.5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ArrowCircleLeftOutlinedIcon
                    onClick={async () => {
                        if (allowBack) {
                            handleBack()
                        }
                    }}
                    sx={
                        allowBack
                            ? {
                                  color: theme.color.grey20,
                                  cursor: 'pointer',
                                  ': hover': {
                                      color: 'white',
                                  },
                              }
                            : {
                                  color: theme.color.grey5,
                                  cursor: 'not-allowed',
                              }
                    }
                />
                <Breadcrumbs sx={{ padding: 1.5, fontSize: 14 }}>
                    {addIndex(map)((item, idx) => {
                        const { name, link } = item as {
                            name: string
                            link: string
                        }

                        const last = idx === data.length - 1

                        return (
                            <Typography
                                onClick={() => !last && navigate(link)}
                                key={name}
                                color={last ? 'text.primary' : ''}
                                fontSize={last ? 16 : 14}
                                sx={{
                                    cursor: last ? 'inherit' : 'pointer',
                                }}
                            >
                                {name}
                            </Typography>
                        )
                    })(data)}

                    {desc && <Typography fontSize={13}>{`${desc}`}</Typography>}
                </Breadcrumbs>
            </Box>

            {handleRefresh && (
                <RefreshOutlinedIcon
                    onClick={() => {
                        handleRefresh()
                    }}
                    sx={{
                        color: theme.color.grey15,
                        cursor: 'pointer',
                        ': hover': {
                            color: theme.color.grey20,
                        },
                    }}
                ></RefreshOutlinedIcon>
            )}
        </Box>
    )
}

export default BreadcrumbsCmp
