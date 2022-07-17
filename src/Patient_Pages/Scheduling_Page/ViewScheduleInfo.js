import React from 'react';
import Patient_Info_Icon from "./Images/Patient_Info_Icon.png";
import Child_Info_Icon from "./Images/Child_Info_Icon.png";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function ViewScheduleInfo(){

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


    function CloseScheduleModal(){
        setTimeout(function () {
            document.getElementById("view_schedule_container").style.display = "none";
        }, 400);
        document.getElementById("view_schedule").style.marginRight = "-100%";
    }

return(
 <div className="view_schedule_container" id="view_schedule_container">
    <div className="view_schedule" id="view_schedule">
        <div className="close_btn">
          <LightTooltip title="Close">
            <span onClick={CloseScheduleModal}>&#xd7;</span>
          </LightTooltip> 
         </div>
        <div className="top">
            <div className="first">
                <img alt="" src={Patient_Info_Icon}/>
                <p>Mother's <span style={{color:"#4D77FF"}}>Information</span></p>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>FIRST NAME</label>
                    <p id="mother_fname"></p>
                </div>
                <div className="center">
                    <label>MIDDLE NAME</label>
                    <p id="mother_mname"></p>
                </div>
                <div className="left_right">
                    <label>LAST NAME</label>
                    <p id="mother_lname"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>MOTHER ID</label>
                    <p id="mother_id"></p>
                </div>
                <div className="center">
                    <label>EMAIL ADDRESS</label>
                        <p style={{textTransform:"none",overflow:"hidden",textOverflow:"ellipsis",marginRight:"5px"}} id="mother_email"></p>
                </div>
                <div className="left_right">
                    <label>CONTACT NO.</label>
                    <p id="mother_contact"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>PUROK</label>
                    <p id="mother_purok"></p>
                </div>
                <div className="center">
                    <label>BARANGAY</label>
                    <p id="mother_barangay"></p>
                </div>
                <div className="left_right">
                    <label>Municipality</label>
                    <p id="mother_city"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Province</label>
                    <p id="mother_province"></p>
                </div>
                <div className="center">
                    <label>APPOINTMENT DATE</label>
                    <p style={{textTransform:"none"}} id="mother_date"></p>
                </div>
                <div className="left_right">
                    <label>APPOINTMENT STATUS</label>
                    <p id="mother_status"></p>
                </div>
            </div>
        </div>

        <div className="bottom">
            <div className="first">
               <img alt="" src={Child_Info_Icon}/>
               <p>Child <span style={{color:"#4D77FF"}}>Information</span></p>
            </div>

            <div className="second">
                <div className="info_container">
                    <div className="left_right">
                        <label>FIRST NAME</label>
                        <p id="child_fname"></p>
                    </div>
                    <div className="center">
                        <label>MIDDLE NAME</label>
                        <p id="child_mname"></p>
                    </div>
                    <div className="left_right">
                        <label>LAST NAME</label>
                        <p id="child_lname"></p>
                    </div>
                </div>
                <div className="info_container">
                    <div className="left_right">
                        <label>Birthday</label>
                        <p id="child_bday"></p>
                    </div>
                    <div className="center">
                        <label>Days old</label>
                        <p id="child_age"></p>
                    </div>
                    <div className="left_right">
                        <label>Sex</label>
                        <p id="child_sex"></p>
                    </div>
                </div>
                <div className="info_container">
                    <div className="left_right">
                        <label>Weight</label>
                        <p id="child_weight"></p>
                    </div>
                    <div className="center">
                        <label>Place of delivery</label>
                        <p id="child_pod"></p>
                    </div>
                    <div className="left_right">
                        <label>Vaccine Name</label>
                        <p id="child_vaxName"></p>
                    </div>
                </div>
                <div className="info_container">
                    <div className="left_right">
                        <label>Vaccine Dose no.</label>
                        <p id="child_vaxDose"></p>
                    </div>
                </div>
            </div>

        </div>

    </div>
 </div>
)
}