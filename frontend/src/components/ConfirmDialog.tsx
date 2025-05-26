import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from "@mui/material";

function ConfirmDialog({open, onClose, onConfirm, title, description}){
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