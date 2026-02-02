import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { sendResetRequest } from '../../../api/user';
import TextField from '@mui/material/TextField';
import { useRef} from "react";

function ForgotPassword({ open, handleClose, snackBarVisibility }) {
  const emailPrompt = useRef("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  
  function handleSendResetRequest() {
    const email = emailPrompt.current.value;

    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setEmailError(true);
    setEmailErrorMessage('Please enter a valid email address.');
    isValid = false;
  } else {
    setEmailError(false);
    setEmailErrorMessage('');
  }
  if(isValid) {
    try {
      sendResetRequest(email);
      snackBarVisibility(() => {
        return {
          display: true,
            content: `Password reset link has been sent to ${email}`,
            severity: "info"
          }
        });
        handleClose();
      }
      catch(e) {
        snackBarVisibility(() => {
          return {
            display: true,
            content: `Error while sending password reset link`,
            severity: "error"
          }
        });
      }
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <TextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            inputRef={emailPrompt}
            color={emailError ? 'error' : 'primary'}
          />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSendResetRequest}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
