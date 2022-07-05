import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function EachPendingRow(props){

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

   //Showing delete modal
   function Show_Appointment_Delete_Modal(){
       document.getElementById("reject_sched_modal_container").style.display = "flex";
       document.getElementById("reject_schedule_modal_key").value = props.id;
       document.getElementById("email_reject_key").value = props.email;
       document.getElementById("name_reject_key").value = props.motherFname+" "+props.motherLname;
       document.getElementById("date_reject_key").value = props.appointmentDate;
   }

    //Showing Accept modal
    function Show_Appointment_Accept_Modal(){
        document.getElementById("Accept_sched_modal_container").style.display = "flex";
        document.getElementById("accept_modal_key").value = props.id;
        document.getElementById("email_accept_key").value = props.email;
        document.getElementById("name_accept_key").value = props.motherFname+" "+props.motherLname;
        document.getElementById("date_accept_key").value = props.appointmentDate;
    }
 
    //View schedule Modal
    function ViewScheduleModal(){
        document.getElementById("view_schedule_container").style.display = "flex";
        setTimeout(function () {
            document.getElementById("view_schedule").style.marginRight = "0";
        }, 10);
        document.getElementById("mother_fname").textContent = props.motherFname;
        document.getElementById("mother_mname").textContent = props.motherMname;
        document.getElementById("mother_lname").textContent = props.motherLname;
        document.getElementById("mother_id").textContent = props.motherID;
        document.getElementById("mother_email").textContent = props.email;
        document.getElementById("mother_contact").textContent = props.contact;
        document.getElementById("mother_purok").textContent = props.purok;
        document.getElementById("mother_barangay").textContent = props.barangay;
        document.getElementById("mother_city").textContent = props.municipality;
        document.getElementById("mother_province").textContent = props.province;
        document.getElementById("mother_date").textContent = props.appointmentDate;
        document.getElementById("mother_status").textContent = props.appointmentStatus;
        document.getElementById("child_fname").textContent = props.child_fname;
        document.getElementById("child_mname").textContent = props.child_mname;
        document.getElementById("child_lname").textContent = props.child_lname;
        document.getElementById("child_bday").textContent = props.child_bdate;
        document.getElementById("child_age").textContent = props.child_age+" days old";
        document.getElementById("child_sex").textContent = props.child_sex;
        document.getElementById("child_weight").textContent = props.child_weight+" kgs";
        document.getElementById("child_pod").textContent = props.child_placeDelivery;
        document.getElementById("child_vaxName").textContent = props.child_vaccineName;
        document.getElementById("child_vaxDose").textContent = props.child_vaccineDose+" Dose";
    }

    return(
    <div className="table_tr each_Table" id="each_Table">
        <div className="header2" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span pending_Date" style={{textAlign:"center",fontSize:".9rem"}}>{props.appointmentDate}</span>
        </div>
        <div className="header3" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.motherFname+" "+props.motherLname}</span>
        </div>
        <div className="header4" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.contact}</span>
        </div>
        <div className="header5" style={{borderBottom:"1px solid #DCE3EC"}}>
            <div className="header_status">
               {props.appointmentStatus}
             </div>
        </div>
        <div className="header6" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
              <LightTooltip title="See more actions">
                <MoreVertIcon id="action_table_btn"/>
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

                <form>
                <MenuItem onClick={ViewScheduleModal}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;View &nbsp;&nbsp;&nbsp;
                </MenuItem>
                </form>

                <MenuItem onClick={Show_Appointment_Accept_Modal}>
                    <ListItemIcon>
                        <CheckIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Accept &nbsp;&nbsp;&nbsp;
                </MenuItem>
                <MenuItem onClick={Show_Appointment_Delete_Modal}>
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