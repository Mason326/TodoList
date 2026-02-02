import {useContext} from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { AppContext } from '../../context/AppContext';

function renderRow(props) {
  const { index, style } = props;
  const App = useContext(AppContext);
  const project = App.projects[index]

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => App.visiblePage(project.project_id)}>
        <ListItemText primary={project.project_name} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const App = useContext(AppContext);
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 254, bgcolor: 'background.black', scrollbarColor: "gray black" }}
    >
      <FixedSizeList
        height={400}
        width={254}
        itemSize={46}
        itemCount={ App.projects.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
