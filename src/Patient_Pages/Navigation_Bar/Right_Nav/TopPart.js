import React, { useEffect, useState } from 'react';
import axios from "axios";
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
import EachNotif from "./EachNotif";
import CircularProgress from '@mui/material/CircularProgress';

import SuccesSlideModal from '../../../Modals/SuccesSlideModal';

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
    function gotoLogout(){
      navigate(`/`);
    }
    function gotoPending(){
        navigate(`/Administration_Pending_Schedule`);
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

    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);
        const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    

  //Loading while fetching data in axios
  const [loading,setLoading] = useState(false);
  //Hook for view the list of task of user
  const [appointments, setAppoointments] = useState([]);  
  const loadAppointment = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Appointments_Notif.php");
    setLoading(true);
    setAppoointments(result.data.phpresult);
  };
  useEffect(() => {
      loadAppointment();
   }, []);
 
  //getting the email of user
  let email_key = localStorage.getItem('patient_login_email');
  var array_pending_schedule_ctr = 0;
  const Each_notif = appointments.map((res) => {
      if(res.email === email_key){
      array_pending_schedule_ctr++;
      return (
        <EachNotif
        key={array_pending_schedule_ctr}
        id = {res.id}
        email = {res.email}
        motherFname = {res.mother_fname}
        motherLname = {res.mother_lname}
        appointmentDate = {res.appointment_date}
        appoint_created = {res.appoint_created}
        />
      ); 
    }
  });


    return(
    <div className="top">
        <div className="left">
            <IconButton aria-label="notification">
                <StyledBadge badgeContent={array_pending_schedule_ctr}>
                    <NotificationsNoneIcon fontSize="large"
                        onClick={handleClick1}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open1 ? 'account-menu1' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open1 ? 'true' : undefined}
                    />
                </StyledBadge>
            </IconButton>
        </div>
        <Menu
        disableRipple
        anchorEl={anchorEl1}
        id="account-menu1"
        open={open1}
        onClose={handleClose1}
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
            <div className="notification_container">
                <div className="top">Schedules</div>
                <div className="scrollable_container">
                    
                {loading ?
                  array_pending_schedule_ctr === 0 ?
                  <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <p style={{fontSize:"1rem",fontWeight:"800"}}>No notification available</p>
                  </div> :   Each_notif  
                :
                <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <CircularProgress style={{height:"60px",width:"60px"}}/>
                </div> 
                }
                
                </div>
                <div className="bottom">
                    <span onClick={gotoPending}>View all schedule</span>
                </div>
            </div>
        </Menu>
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
                      src={localStorage.getItem("url_account_img")+localStorage.getItem("patient_login_photo")}  alt="" 
                      onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_account_img")+"Default_Avatar.png"}}
                    />
                    <p>{localStorage.getItem("patient_login_firstname")}</p>
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
                <MenuItem onClick={gotoLogout}>
                    <ListItemIcon>
                        <Logout fontSize="medium"/>
                    </ListItemIcon>
                     &nbsp;&nbsp;Sign Out&nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
        </div>

        {/*Success slide modal*/}
        <SuccesSlideModal/>
    </div>
    )
}