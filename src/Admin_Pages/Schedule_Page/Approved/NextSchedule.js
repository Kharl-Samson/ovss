import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Patient_Info_Icon from "../Images/Patient_Info_Icon.png";
import Calendar_Icon from "../Images/Calendar_Icon.png";
import Vaccine_Icon from "../Images/Vaccine_Icon.png";
import CircularProgress from '@mui/material/CircularProgress';

export default function NextSchedule(props){
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

  function CloseNextScheduleModal(){
    setTimeout(function () {
        document.getElementById("next_schedule_container").style.display = "none";
    }, 400);
    document.getElementById("next_schedule").style.marginRight = "-100%";
  }

return(
<div className="next_schedule_container" id="next_schedule_container">
    <div className="next_schedule" id="next_schedule">
        <div className="close_btn">
          <LightTooltip title="Close">
            <span onClick={CloseNextScheduleModal}>&#xd7;</span>
          </LightTooltip> 
         </div>
        <div className="top">
            <div className="first">
                <img alt="" src={Patient_Info_Icon}/>
                <p>Schedule <span style={{color:"#4D77FF"}}>Information</span></p>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Mother's NAME</label>
                    <p id="mother_name_next"></p>
                </div>
                <div className="left_right">
                    <label>Mother's ID</label>
                    <p id="mother_id_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>EMAIL</label>
                    <p id="mother_email_next" style={{textTransform:"none"}}></p>
                </div>
                <div className="left_right">
                    <label>Contact</label>
                    <p id="mother_contact_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Purok</label>
                    <p id="mother_purok_next"></p>
                </div>
                <div className="left_right">
                    <label>Barangay</label>
                    <p id="mother_bar_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Child's Name</label>
                    <p id="mother_Cname_next"></p>
                </div>
                <div className="left_right">
                    <label>Birthday</label>
                    <p id="mother_Cbday_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Days old</label>
                    <p id="mother_Cage_next"></p>
                </div>
                <div className="left_right">
                    <label>Sex</label>
                    <p id="mother_Csex_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Weight</label>
                    <p id="mother_Cweight_next"></p>
                </div>
                <div className="left_right">
                    <label>Vaccine Name</label>
                    <p id="mother_Cvaxname_next"></p>
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Date Today</label>
                    <div className="date">
                        <div className="left">
                            <span id="mother_Cdatetoday_next"></span>
                        </div>
                        <div className="right">
                            <img alt="" src={Calendar_Icon}/> 
                        </div>
                    </div>
                </div>
                <div className="left_right">
                    <label>Vaccine dose no.</label>
                    <div className="vax_dose">
                        <div className="left">
                            <img alt="" src={Vaccine_Icon}/> 
                        </div>
                        <div className="right">
                            <span id="mother_Cdosetoday_next"></span>
                        </div>
                    </div>        
                </div>
            </div>
            <div className="info_container">
                <div className="left_right">
                    <label>Next Dose schedule</label>
                    <input type="date" id="mother_Cdate_next"/>
                </div>
                <div className="left_right">
                    <label>Next vaccine dose no.</label>
                    <div className="vax_dose">
                        <div className="left">
                            <img alt="" src={Vaccine_Icon}/> 
                        </div>
                        <div className="right">
                            <span id="mother_Cdose_next"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <form onSubmit={props.formAction}>
        <div className="bottom">
            <input type="hidden" id="nextValue_oldID"/>
            <input type="hidden" id="nextValue_email"/>
            <input type="hidden" id="nextValue_mother_id"/>
            <input type="hidden" id="nextValue_mother_fname"/>
            <input type="hidden" id="nextValue_mother_mname"/>
            <input type="hidden" id="nextValue_mother_lname"/>
            <input type="hidden" id="nextValue_purok"/>
            <input type="hidden" id="nextValue_barangay"/>
            <input type="hidden" id="nextValue_municipality"/>
            <input type="hidden" id="nextValue_province"/>
            <input type="hidden" id="nextValue_appointment_date"/>
            <input type="hidden" id="nextValue_contact"/>
            <input type="hidden" id="nextValue_child_fname"/>
            <input type="hidden" id="nextValue_child_mname"/>
            <input type="hidden" id="nextValue_child_lname"/>
            <input type="hidden" id="nextValue_child_bdate"/>
            <input type="hidden" id="nextValue_child_age"/>
            <input type="hidden" id="nextValue_child_sex"/>
            <input type="hidden" id="nextValue_child_weight"/>
            <input type="hidden" id="nextValue_child_placeDelivery"/>
            <input type="hidden" id="nextValue_child_vaccineName"/>
            <input type="hidden" id="nextValue_child_vaccineDose"/>
            <input type="hidden" id="nextValue_appointment_status"/>
            <button type="button" onClick={CloseNextScheduleModal}>Cancel</button>

            <button type="submit">
                <center>
                    <CircularProgress color="inherit" id="progress_btn" className="progress_btn_next_sched"/>
                    <span className="text_btn_next_sched">Submit</span>
                </center> 
            </button>
        </div>
        </form>
        
    </div>
</div>
)
}