import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from "@mui/material";

function ConfirmDialog({open, onClose, onConfirm, title, description}: {
    open: boolean,
    title: string,
    description: string,
    onClose: () => void, // Type for a function that takes no arguments and returns nothing
    onConfirm: () => void
}){
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => {onConfirm(); onClose()} } color="error" autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog