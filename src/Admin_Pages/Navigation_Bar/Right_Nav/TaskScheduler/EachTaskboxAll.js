import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Calendar_Icon from "../TaskScheduler/calendar.svg";
import Time_Icon from "../TaskScheduler/time.svg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

export default function TaskBoxAll_component(props){
    var dateFormat =  moment(props.date).format('LL');

    //Menu on navbar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return(
    <div className="task_box_container">
        <MoreHorizIcon sx={{float : 'right', marginRight: "5%", marginTop:"3%", color:"#ffff"}} className="MoreHorizIcon" onClick={handleClick}/>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem style={{display:"none"}}></MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                Edit Task
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Menu>

        <div className="date_container">
            <img src={Calendar_Icon} alt=""/>
            {dateFormat}
        </div>

        <p className="title">{props.title}</p>
        <p className="description">{props.description}</p>

        <div div className="date_container" style={{marginTop: "0"}}>
          <img src={Time_Icon} alt=""/>
          {props.time}
        </div>
    </div>     
    )
}