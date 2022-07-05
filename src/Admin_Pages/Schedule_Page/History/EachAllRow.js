import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function EachAllRow(props){

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
            <span className="header_span all_Date" style={{textAlign:"center",fontSize:".9rem"}}>{props.appointmentDate}</span>
        </div>
        <div className="header3" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.motherFname+" "+props.motherLname}</span>
        </div>
        <div className="header4" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.contact}</span>
        </div>
        
        <div className="header5" style={{borderBottom:"1px solid #DCE3EC"}}>
            <div className="header_status" style={{backgroundColor: props.bg_color,color: props.color}}>
               {props.appointmentStatus}
             </div>
        </div>
        <div className="header6" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>
              <LightTooltip title="View full information">
                <RemoveRedEyeIcon id="action_table_btn" onClick={ViewScheduleModal} style={{color:"#697A8D"}}/>
              </LightTooltip>
            </span>
        </div>
    </div>
    )
}