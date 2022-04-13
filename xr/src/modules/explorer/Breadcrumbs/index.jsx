import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import _ from 'lodash'

import Style from './style'

const ExploreBreadcrumbs = ({ data, loading, handleClick, handleReload }) => {
    const classes = Style()

    const handleBack = () => {
        const path = data[data.length - 2].path
        handleClick(path)
    }

    return (
        <div className={classes.container}>
            <IconButton
                size="small"
                disabled={data.length <= 1}
                color="primary"
                onClick={handleBack}
            >
                <ArrowBackIcon className={classes.back} />
            </IconButton>

            <Breadcrumbs className={classes.content}>
                {_.map(data, (val, idx) => {
                    if (idx === data.length - 1) {
                        return (
                            <Typography className={classes.last} key={idx}>
                                {val.name}
                            </Typography>
                        )
                    }

                    return (
                        <Link
                            className={classes.link}
                            key={idx}
                            color="inherit"
                            href={val.href}
                            onClick={() => handleClick(val.path)}
                        >
                            {val.name}
                        </Link>
                    )
                })}
            </Breadcrumbs>

            {loading ? (
                <CircularProgress size={20} />
            ) : (
                <AutorenewIcon
                    className={classes.reload}
                    onClick={handleReload}
                />
            )}
        </div>
    )
}

export default ExploreBreadcrumbs
