import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function EachVaccine(props){
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

  function ViewVaccineModal(){
    document.getElementById("view_vaccine_container").style.display = "flex";
    setTimeout(function () {
        document.getElementById("view_container").style.marginRight = "0";
    }, 10);

    document.getElementById("vaccine_image").src = localStorage.getItem("url_vaccine")+props.image;
    document.getElementById("vaccine_name").textContent = props.name;
    document.getElementById("vaccine_description").textContent = props.description;
    document.getElementById("vaccine_prevented").textContent = props.prevented;
    document.getElementById("vaccine_age").textContent = props.age+" day/s old";
    document.getElementById("vaccine_dose").textContent = props.dose_no+" dose";
  
    var interval = "";
    props.days_interval === "0" ? interval = "N/A" : interval = props.days_interval+" days";

    document.getElementById("vaccine_intertval").textContent = interval;
    
  }

  function EditVaccineModal(){
    document.getElementById("edit_vaccine_container").style.display = "flex";
    setTimeout(function () {
        document.getElementById("edit_container").style.marginRight = "0";
    }, 10);

    document.getElementById("vaccine_image_edit").src = localStorage.getItem("url_vaccine")+props.image;
    document.getElementById("image_input").value = props.image;
    document.getElementById("edit_vax_id").value = props.id;
    document.getElementById("edit_vax_name").value = props.name;
    document.getElementById("edit_vax_abbreviation").value = props.abbreviation;
    document.getElementById("edit_vax_descripiton").value = props.description;
    document.getElementById("edit_vax_disease").value = props.prevented;
    document.getElementById("edit_vax_age").value = props.age;
    document.getElementById("edit_vax_dosage").value = props.dose_no;
    document.getElementById("edit_vax_days").value = props.days_interval;
  }

    return(
    <div className="vaccine_cotainer">

        <p style={{display:"none"}}>{props.name}</p>
        <p style={{display:"none"}}>{props.prevented}</p>

        <div className='top'>
          <MoreVertIcon fontSize="large" id="dot"    
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined} 
          />
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
          <MenuItem onClick={ViewVaccineModal}>
            <ListItemIcon>
              <VisibilityIcon fontSize="medium"/>
            </ListItemIcon>
            &nbsp;&nbsp;View &nbsp;&nbsp;&nbsp;
          </MenuItem>

          <MenuItem onClick={EditVaccineModal}>
            <ListItemIcon>
              <ModeEditIcon fontSize="medium"/>
            </ListItemIcon>
            &nbsp;&nbsp;Edit &nbsp;&nbsp;&nbsp;
          </MenuItem>
        </Menu>

        <img alt="" src={localStorage.getItem("url_vaccine")+props.image}
        onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_vaccine")+"default_img.jpg"}}
        />
        <div className='bot1'>
            <span>{props.abbreviation}</span>
        </div>
        <div className='bot2'>
            <p>Recommended for the children with {props.age} days old</p>
        </div>
    </div>
    )
}