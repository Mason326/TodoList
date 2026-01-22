import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const {openDial, onClose, onSubmit} = props;

    console.log(openDial)
    console.log(onClose)
    console.log(onSubmit)
    
    const handleSubmit = () => {
        onSubmit()
        onClose()
    }

  return (
    <React.Fragment>
      <Dialog
        open={openDial}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Signing Out"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit()} autoFocus>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
