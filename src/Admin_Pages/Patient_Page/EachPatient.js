import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

export default function EachPatient_box(props){
  let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
      const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    function goToPatientProfile(){
      window.localStorage.setItem('patient_profile_key', props.email);
      window.localStorage.setItem('patient_profile_id_key', props.id);
      navigate(`/Administration_Patient_Profile`);
    }

return(
<div className='patient_box_container patient_container'>

    <input type="hidden" value={props.id}/>
    <input type="hidden" value={props.email}/>
    <input type="hidden" value={props.fname}/>
    <input type="hidden" value={props.mname}/>
    <input type="hidden" value={props.lname}/>
    <input type="hidden" value={props.bday}/>
    <input type="hidden" value={props.age}/>
    <input type="hidden" value={props.purok}/>
    <input type="hidden" value={props.barangay}/>
    <input type="hidden" value={props.municipality}/>
    <input type="hidden" value={props.province}/>
    <input type="hidden" value={props.contact}/>
    <input type="hidden" value={props.profile_photo}/>
    <input type="hidden" value={props.date_created} id="date_created" className="date_created"/>
    <input type="hidden" value={props.child_fname}/>
    <input type="hidden" value={props.child_mname}/>
    <input type="hidden" value={props.child_lname}/>
    <input type="hidden" value={props.child_sex}/>
    <input type="hidden" value={props.child_weight}/>
    <input type="hidden" value={props.child_place}/>
    <input type="hidden" value={props.child_bday}/>
    <input type="hidden" value={props.child_age}/>

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
          <MenuItem onClick={goToPatientProfile}>
            <ListItemIcon>
              <VisibilityIcon fontSize="medium"/>
            </ListItemIcon>
            &nbsp;&nbsp;View &nbsp;&nbsp;&nbsp;
          </MenuItem>
    </Menu>
    <div className='middle'>
        <img alt="" 
        src={localStorage.getItem("url_account_img")+props.profile_photo}
        onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_account_img")+"default_avatar.png"}}
        />
    </div>
    <div className='bottom'>
      <p>{props.fname+" "+props.lname}</p>
      <p>{props.email}</p>
    </div>
</div>
)
}