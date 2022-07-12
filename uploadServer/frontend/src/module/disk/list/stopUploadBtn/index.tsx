import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/system/Box'
import { useDispatch, useSelector } from 'react-redux'

import { uploadStatusEnum } from 'src/reducer/uploadServer/type'
import { RootState, Dispatch } from 'src/reducer/type'
import { useT } from 'src/hooks/language'

interface StopUploadBtnProps {
    diskId: string
    serverId: string
    uploadStatus: uploadStatusEnum
}

const StopUploadBtn = (payload: StopUploadBtnProps) => {
    const { uploadStatus, diskId, serverId } = payload

    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch<Dispatch>()

    const t = useT()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        try {
            const rv = await dispatch.disk.stopUpload({ serverId, diskId })

            if (rv && rv.code === 0) {
                dispatch.snackbar.push({
                    timeStamp: new Date().getTime(),
                    severity: 'success',
                    msg: t('uploadHasBeenManuallyFinish'),
                })

                dispatch.disk.initData({})
                dispatch.uploadServer.initData({})

                setOpen(false)
            } else {
                dispatch.snackbar.push({
                    timeStamp: new Date().getTime(),
                    severity: 'error',
                    msg: t('unableToManuallyFinish', rv.msg),
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    if (
        uploadStatus !== uploadStatusEnum.WAITING_TO_UPLOAD &&
        uploadStatus !== uploadStatusEnum.DATA_UPLOADING
    ) {
        return null
    }

    return (
        <Box sx={{ display: 'inline-block' }}>
            <Button color="primary" size="small" onClick={handleOpen}>
                {t('finishManually')}
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ marginTop: '-200px' }}
            >
                <DialogTitle id="alert-dialog-title">
                    {t('confirmToManuallyFinishTheUpload', payload.diskId)}
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={handleOk} color="error" autoFocus>
                        {t('confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default StopUploadBtn
