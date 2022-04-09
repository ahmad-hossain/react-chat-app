import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormDialogProps {
    open: boolean,
    handleClose: () => void,
    handleConfirm: () => void,
    onCommentTextChange: (newText: string) => void,
    commentText: string,
    textFieldLabel: string,
    dialogTitle: string,
    confirmBtnText: string,
    cancelBtnText: string
}

export default function FormDialog({ open, handleClose, handleConfirm,onCommentTextChange, commentText, textFieldLabel, dialogTitle, confirmBtnText, cancelBtnText }: FormDialogProps) {

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={commentText}
                        onChange={(e) => onCommentTextChange(e.target.value)}
                        id="name"
                        label={textFieldLabel}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelBtnText}</Button>
                    <Button onClick={handleConfirm}>{confirmBtnText}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}