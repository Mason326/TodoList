import {useContext, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PageContext } from '../../../context/PageContext';

export default function CreateTaskDialog() {
    const fieldValue = useRef();
    const Page = useContext(PageContext);
    const handleSubmit = (event) => {
    event.preventDefault();
    Page.createTask(fieldValue.current.value);
    Page.close();
    };

  return (
    <Dialog open={Page.openState} onClose={Page.close}>
    <DialogTitle>Create a task</DialogTitle>
    <DialogContent>
        <DialogContentText>
        To create a task, please enter task here. It will 
        display on the screen
        </DialogContentText>
        <form onSubmit={handleSubmit} id="subscription-form">
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="Need todo"
            type="text"
            fullWidth
            variant="standard"
            inputRef={fieldValue}
        />
        </form>
    </DialogContent>
    <DialogActions>
        <Button onClick={Page.close}>Cancel</Button>
        <Button type="submit" form="subscription-form">
        Create
        </Button>
    </DialogActions>
    </Dialog>
  );
}
