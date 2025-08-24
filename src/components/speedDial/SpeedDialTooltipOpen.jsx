import {useContext} from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { AppContext } from '../../context/AppContext';
import { PageContext } from '../../context/PageContext';

export default function SpeedDialTooltipOpen() {
  const App = useContext(AppContext);
  const Page = useContext(PageContext);
  const actions = [
    { icon: <AddTaskIcon />, name: 'Add Task', click: () => Page.open() },
    { icon: <PlaylistAddIcon />, name: 'Add Project', click: () => App.creatingPage(true) },
    { icon: <ClearAllIcon />, name: 'Delete Completed', click: () => Page.deleteCompleted() },
  ];
  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 3, right: 25, zIndex: 10 }}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        FabProps={{
        sx: {
          bgcolor: '#404040',
          '&:hover': {
            bgcolor: '#404040'
          }
        }
      }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name,
              },
            }}
            onClick={action.click}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
