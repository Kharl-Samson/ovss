import React, { useEffect, useState } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';

export default function EachApprovedRow(props){

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

    //Hook for view the list of vaccines
    const [vaccines, setVaccines] = useState([]);  
    const loadVaccines = async () =>{
      const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Vaccines.php");
      setVaccines(result.data.phpresult);
    };
    useEffect(() => {
      loadVaccines();
    }, []);


    function Mask_as_Done(){

     vaccines.map((res) => {

        if(res.name === props.child_vaccineName ){//If the vaccine needs two or more dose
 
            if(props.child_vaccineDose === res.dose_no){
                document.getElementById("Accept_sched_modal_container").style.display = "flex";
                document.getElementById("accept_modal_key").value = props.id;
                document.getElementById("email_accept_key").value = props.email;
            }
            else if(props.child_vaccineDose <= res.dose_no){
                document.getElementById("next_schedule_container").style.display = "flex";
                setTimeout(function () {
                    document.getElementById("next_schedule").style.marginRight = "0";
                }, 10);
                //Date of appointment
                var date = new Date(props.appointmentDate); 
                //Date today
                var date_today = new Date();
                var datestringToday = date_today.getFullYear() + "-"+ ("0"+(date_today.getMonth()+1)).slice(-2) + "-" + ("0" + date_today.getDate()).slice(-2)
                //Setting the next date of appointment
                date.setDate(date.getDate() + parseInt(res.days_interval)); 
                //Next date variable
                var datestring = date.getFullYear() + "-"+ ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
                document.getElementById("mother_name_next").textContent = props.motherFname+" "+props.motherLname;
                document.getElementById("mother_id_next").textContent = props.motherID;
                document.getElementById("mother_email_next").textContent = props.email;
                document.getElementById("mother_contact_next").textContent = props.contact;
                document.getElementById("mother_purok_next").textContent = props.purok;
                document.getElementById("mother_bar_next").textContent = props.barangay;
                document.getElementById("mother_Cname_next").textContent =  props.child_fname+" "+props.child_lname;
                document.getElementById("mother_Cbday_next").textContent = props.child_bdate;
                document.getElementById("mother_Cage_next").textContent = props.child_age+" days old"
                document.getElementById("mother_Csex_next").textContent = props.child_sex;
                document.getElementById("mother_Cweight_next").textContent = props.child_weight;
                document.getElementById("mother_Cvaxname_next").textContent = props.child_vaccineName;
                document.getElementById("mother_Cdatetoday_next").textContent = datestringToday;
                document.getElementById("mother_Cdosetoday_next").textContent = parseInt(props.child_vaccineDose);
                document.getElementById("mother_Cdate_next").value = datestring;
                document.getElementById("mother_Cdose_next").textContent = parseInt(props.child_vaccineDose)+1;

                document.getElementById("nextValue_oldID").value = props.id;
                document.getElementById("nextValue_email").value = props.email;
                document.getElementById("nextValue_mother_id").value = props.motherID;
                document.getElementById("nextValue_mother_fname").value = props.motherFname;
                document.getElementById("nextValue_mother_mname").value = props.motherMname;
                document.getElementById("nextValue_mother_lname").value = props.motherLname;
                document.getElementById("nextValue_purok").value = props.purok;
                document.getElementById("nextValue_barangay").value = props.barangay;
                document.getElementById("nextValue_municipality").value = props.municipality;
                document.getElementById("nextValue_province").value = props.province; 
                document.getElementById("nextValue_appointment_date").value = document.getElementById("mother_Cdate_next").value;
                document.getElementById("nextValue_contact").value = props.contact;
                document.getElementById("nextValue_child_fname").value = props.child_fname;
                document.getElementById("nextValue_child_mname").value = props.child_mname;
                document.getElementById("nextValue_child_lname").value = props.child_lname;
                document.getElementById("nextValue_child_bdate").value = props.child_bdate;
                document.getElementById("nextValue_child_age").value = props.child_age;
                document.getElementById("nextValue_child_sex").value = props.child_sex;
                document.getElementById("nextValue_child_weight").value = props.child_weight;
                document.getElementById("nextValue_child_placeDelivery").value = props.child_placeDelivery;
                document.getElementById("nextValue_child_vaccineName").value = props.child_vaccineName;
                document.getElementById("nextValue_child_vaccineDose").value = parseInt(props.child_vaccineDose)+1;
                document.getElementById("nextValue_appointment_status").value = "Pending";
            }
            else{//If the vaccine need one dose
                document.getElementById("Accept_sched_modal_container").style.display = "flex";
                document.getElementById("accept_modal_key").value = props.id;
                document.getElementById("email_accept_key").value = props.email;
            }

        }
    });

    

 

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
        document.getElementById("child_vaxDose").textContent = props.child_vaccineDose;
    }

    return(
    <div className="table_tr each_Table" id="each_Table">
        <div className="header2" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span approved_Date" style={{textAlign:"center",fontSize:".9rem"}}>{props.appointmentDate}</span>
        </div>
        <div className="header3" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.motherFname+" "+props.motherLname}</span>
        </div>
        <div className="header4" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.contact}</span>
        </div>
        <div className="header5" style={{borderBottom:"1px solid #DCE3EC"}}>
            <div className="header_status" style={{backgroundColor:"#C1FFCF",color:"#0DC939"}}>
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

                <MenuItem onClick={Mask_as_Done}>
                    <ListItemIcon>
                        <CheckIcon fontSize="medium"/>
                    </ListItemIcon>
                    &nbsp;&nbsp;Mark as done &nbsp;&nbsp;&nbsp;
                </MenuItem>
            </Menu>
        </div>
    </div>
    )
}