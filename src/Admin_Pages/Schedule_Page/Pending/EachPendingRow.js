import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function EachPendingRow(){

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
    <div className="table_tr">
        <div className="header1" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
          <input type="checkbox"/>
        </div>
        <div className="header2" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>06/24/2022</span>
        </div>
        <div className="header3" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>Jayson Batoon</span>
        </div>
        <div className="header4" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>09396164116</span>
        </div>
        <div className="header5" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
            <div className="header_status">
               Pending
             </div>
        </div>
        <div className="header6" style={{borderBottom:"1px solid rgb(150, 150, 150)"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
              <LightTooltip title="See more actions">
                <MoreVertIcon id="action_table_btn"
                />
              </LightTooltip>
            </span>
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
                        <VisibilityIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;View &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CheckIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Accept &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="medium"/>
                    </ListItemIcon>
                     &nbsp;&nbsp;Reject&nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
        </div>
    </div>
    )
}