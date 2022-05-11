import { FC } from 'react'
import Box from '@mui/system/Box'
import { Link } from 'react-router-dom'
import { LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

import Fade from '@mui/material/Fade'
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined'
import MultilineChartOutlinedIcon from '@mui/icons-material/MultilineChartOutlined'
import Tooltip from '@mui/material/Tooltip'
import VerticalSplitOutlinedIcon from '@mui/icons-material/VerticalSplitOutlined'

const MenuItem: FC<{ link: string; title: string }> = ({
    children,
    link,
    title,
}) => {
    let resolved = useResolvedPath(link)
    let match = useMatch({ path: resolved.pathname, end: false })

    return (
        <Tooltip
            sx={{ marginLeft: 0 }}
            title={title}
            arrow
            placement="right"
            enterDelay={500}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
        >
            <Link
                to={link}
                style={{
                    textDecoration: match ? 'underline' : 'none',
                    background: match ? 'rgb(52, 52, 52)' : 'none',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        cursor: 'pointer',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 44,
                        height: 44,
                        color: 'rgb(230, 230, 230)',
                        borderRadius: '2px',
                        '&:hover': {
                            background: 'rgb(52, 52, 52)',
                        },
                    }}
                >
                    {children}
                </Box>
            </Link>
        </Tooltip>
    )
}

const 一级导航 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                background: 'rgb(21, 21, 21)',
                borderRight: '1px solid rgb(52, 52, 52)',
                width: 44,
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <MenuItem title="流程" link={'liu_cheng'}>
                <VerticalSplitOutlinedIcon />
            </MenuItem>
            <MenuItem title="交易决策" link={'jiao_yi_jue_ce'}>
                <BalanceOutlinedIcon />
            </MenuItem>
            <MenuItem title="品种列表" link={'ping_zhong_lie_biao'}>
                <MultilineChartOutlinedIcon />
            </MenuItem>
        </Box>
    )
}

export default 一级导航
