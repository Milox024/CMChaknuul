import Box from '@mui/material/Box';
import Sidebar from '../Navigation/SideBar';
import Navbar from '../Navigation/Navbar';
import SpeedDial from '../Navigation/SpeedDial'

const BaseContainer = (props) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ p: 3, marginTop: 10, marginLeft: 5, marginRight: 5 }}>
        {props.children}
      </Box>
      <SpeedDial />
    </Box>
  );
}
export default BaseContainer;