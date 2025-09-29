import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({openState, onClose}) {
  const {isShowed, severity, text} = openState;
  return (
    <div>
      <Snackbar open={isShowed} autoHideDuration={6000} onClose={onClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
        <Alert
          onClose={onClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
