import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";

export default function EachRowPatient(props){
  let navigate = useNavigate();
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

  function goToPatientProfile(){
    window.localStorage.setItem('patient_profile_key', props.email);
    window.localStorage.setItem('patient_profile_id_key', props.id);
    navigate(`/Administration_Patient_Profile`);
  }

    return(
    <div className="table_tr each_Table row_patient_container" id="each_Table">
        <div className="header2" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}> {"OVSS-"+props.id}</span>
        </div>
        <div className="header3" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.fname+" "+props.lname}</span>
        </div>
        <div className="header4" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.contact}</span>
        </div>
        <div className="header5" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}}>{props.date_created}</span>
        </div>
        <div className="header6" style={{borderBottom:"1px solid #DCE3EC"}}>
            <span className="header_span" style={{textAlign:"center",fontSize:".9rem"}} onClick={goToPatientProfile}> 
            <LightTooltip title="View Patient">
                <RemoveRedEyeIcon id="action_table_btn" style={{color:"#697A8D"}}/>
            </LightTooltip>
            </span>
        </div>
    </div>
    )
}