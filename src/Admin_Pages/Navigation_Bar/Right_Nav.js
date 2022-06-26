import React from "react";
import "./Right_NavigationBar.css";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Url from "../../Functions/Url";

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

export default function Admin_Right_Navigation_Bar(){

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

    //Calling the url of announcement
    Url();
return(
    <div className="right_navigation">
      <div className="top">
        <div className="left">
            <IconButton aria-label="notification">
                <StyledBadge badgeContent={4}>
                    <NotificationsNoneIcon fontSize="large"/>
                </StyledBadge>
            </IconButton>
        </div>
        <div className="right">

            <LightTooltip title="Your profile">
            <div className="box">
                <div className="left">
                    <img 
                      src={localStorage.getItem("url_default_avatar")+"template.png"}  alt="" 
                      onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_default_avatar")+"Default_Avatar.png"}}
                    />
                    <p>Jayson</p>
                </div>
                <span>&#62;</span>
            </div>
            </LightTooltip>
        </div>
      </div>
    </div>
)
}