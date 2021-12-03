import { FC } from 'react'
import { Box } from '@mui/system'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

interface payloadType {
    children?: React.ReactNode
    allowBack?: boolean
}

const Breadcurmbs = ({ children, allowBack = true }: payloadType) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const handleRefresh = () => {
        navigate(0)
    }

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
                    onClick={() => allowBack && navigate(-1)}
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
                    {children}
                </Breadcrumbs>
            </Box>

            <RefreshOutlinedIcon
                onClick={handleRefresh}
                sx={{
                    color: theme.color.grey15,
                    cursor: 'pointer',
                    ': hover': {
                        color: theme.color.grey20,
                    },
                }}
            ></RefreshOutlinedIcon>
        </Box>
    )
}

export default Breadcurmbs
