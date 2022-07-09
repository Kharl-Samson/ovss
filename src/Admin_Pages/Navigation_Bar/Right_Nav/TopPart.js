import React from "react";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import KeyIcon from '@mui/icons-material/Key';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FaceIcon from '@mui/icons-material/Face';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

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
    let navigate = useNavigate();
    //Navigate to view patient
    function gotoViewProfile(){
      navigate(`/Administration_View_Profile`);
    }
    function gotoEditProfile(){
      navigate(`/Administration_Edit_Profile`);
    }
    function gotoChangePassword(){
      navigate(`/Administration_Change_Password`);
    }

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
            >
                <div className="left">
                    <img 
                      src={localStorage.getItem("url_admin_img")+localStorage.getItem("admin_login_photo")}  alt="" 
                      onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_admin_img")+"Default_Avatar.png"}}
                    />
                    <p>{localStorage.getItem("admin_login_firstname")}</p>
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
                <MenuItem onClick={gotoViewProfile}>
                    <ListItemIcon>
                        <FaceIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;My Profile &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem onClick={gotoEditProfile}>
                    <ListItemIcon>
                        <ManageAccountsIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Edit Profile &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem onClick={gotoChangePassword}>
                    <ListItemIcon>
                        <KeyIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Change Password &nbsp;&nbsp;&nbsp;
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