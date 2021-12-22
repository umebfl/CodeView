import React from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem, { ListItemBaseProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import StorageIcon from '@mui/icons-material/Storage'
import Fade from '@mui/material/Fade'
// import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined'

import { LinkProps, useMatch, useResolvedPath } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CustomLink = ({ children, to, ...props }: LinkProps) => {
    const theme = useTheme()

    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: false })

    return (
        <div>
            <Link
                style={{ textDecoration: match ? 'underline' : 'none' }}
                to={to}
                {...props}
            >
                <ListItemIcon
                    sx={{
                        width: 40,
                        minWidth: 40,
                        height: 36,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        cursor: 'pointer',
                        background: match
                            ? theme.color.grey5
                            : theme.color.grey2,
                        ':hover': {
                            background: theme.color.grey5,
                        },
                    }}
                >
                    {children}
                </ListItemIcon>
            </Link>
        </div>
    )
}

interface ListItemType extends ListItemBaseProps {
    title: string
}

const CustomListItem = ({ children, ...props }: ListItemType) => {
    return (
        <Tooltip
            sx={{ marginLeft: 0 }}
            title={props.title}
            placement="right"
            enterDelay={500}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
        >
            <ListItem sx={{ justifyContent: 'center' }}>{children}</ListItem>
        </Tooltip>
    )
}

const Menu = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: 57,
                borderRight: theme.borderLine.lightSolid,
            }}
        >
            <nav>
                <List>
                    <CustomListItem
                        sx={{ justifyContent: 'center' }}
                        title={'Upload server'}
                    >
                        <CustomLink to="/up">
                            <StorageIcon
                                sx={{ color: theme.color.grey15 }}
                                fontSize="small"
                            />
                        </CustomLink>
                    </CustomListItem>

                    {/* <CustomListItem title={"Disk"}>
                        <CustomLink to="/disk">
                            <AlbumOutlinedIcon
                                sx={{ color: theme.color.grey15 }}
                                fontSize="small"
                            />
                        </CustomLink>
                    </CustomListItem> */}
                </List>
            </nav>
        </Box>
    )
}

export default Menu
