import React from "react";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Logout from '@mui/icons-material/Logout';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 5,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: '#EB5757',
      color:"#ffff",
    },
  }));

export default function Top_Nav_Part(){
    //Tooltip
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }}/>
          ))(({ theme }) => ({
          [`& .${tooltipClasses.tooltip}`]: {
              backgroundColor: theme.palette.common.white,
              color: 'rgba(0, 0, 0, 0.87)',
              boxShadow: theme.shadows[1],
              fontSize: ".8rem",
        },
    }));   
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return(
    <div className="top">
        <div className="left">
            <IconButton aria-label="notification">
                <StyledBadge badgeContent={4}>
                    <NotificationsNoneIcon fontSize="large"/>
                </StyledBadge>
            </IconButton>
        </div>
        <div className="right">

            <div className="box"
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              title="Your profile"
            >
                <div className="left">
                    <img 
                      src={localStorage.getItem("url_default_avatar")+"template.png"}  alt="" 
                      onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_default_avatar")+"Default_Avatar.png"}}
                    />
                    <p>Jayson</p>
                </div>
                <span>&#62;</span>
            </div>     
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
                        <ManageAccountsIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;My Profile &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Settings &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="medium"/>
                    </ListItemIcon>
                     &nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
        </div>
    </div>
    )
}