import { useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { compose, addIndex, map, values } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, Dispatch } from 'src/reducer/type'
import { snackbarPropsType } from 'src/reducer/snackbar/type'
import { SnackbarCmpType } from 'src/component/snackbar/type'

const DURATION = 6 * 1000

const SnackbarCmp = ({ data, idx }: SnackbarCmpType) => {
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        setTimeout(() => {
            dispatch.snackbar.pop(data.timeStamp)
        }, 6000)
    }, [])

    return (
        <Snackbar
            open={true}
            style={{
                top: 55 * ((1 + idx) as number),
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={DURATION}
        >
            <Alert severity={data.severity}>{data.msg}</Alert>
        </Snackbar>
    )
}

export default function SnackbarContainer() {
    const { data } = useSelector((state: RootState) => state.snackbar)
    return (
        <>
            {compose(
                addIndex(map)((item, idx: number) => (
                    <SnackbarCmp
                        key={(item as snackbarPropsType).timeStamp}
                        data={item as snackbarPropsType}
                        idx={idx}
                    />
                )),
                values
            )(data)}
        </>
    )
}
