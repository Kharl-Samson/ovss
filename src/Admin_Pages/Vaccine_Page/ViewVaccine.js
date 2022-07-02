import React from "react";
import Vaccine_Icon from "./Images/Vaccine_Icon.png";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function ViewVaccine(){

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

  function CloseVaccineModal(){
    setTimeout(function () {
        document.getElementById("view_vaccine_container").style.display = "none";
    }, 400);
    document.getElementById("view_container").style.marginRight = "-100%";
  }

return(
  <div className="view_vaccine_container" id="view_vaccine_container">
    <div className="view_container" id="view_container">
        <div className="close_btn">
          <LightTooltip title="Close">
            <span onClick={CloseVaccineModal}>&#xd7;</span>
          </LightTooltip> 
        </div>
        <div className="top">
            <div className="first">
               <img alt="" src={Vaccine_Icon}/>
                <p>Vaccine <span style={{color:"#4D77FF"}}>Information</span></p>
            </div>

            <div className="second">
              <div className="left">
                <img alt="" id="vaccine_image" src={localStorage.getItem("url_vaccine")+"ipv.png"}/>
              </div>
              <div className="right">
                <label>VACCINE NAME</label>
                <p id="vaccine_name"></p>
              </div>
            </div>
        </div> 

        <div className="bottom">
            <div className="content">
                <label>VACCINE DESCRIPTION</label>
                <p style={{marginBottom:"40px"}} id="vaccine_description"></p>

                <div className="flex_bot">
                    <div className="box">
                        <label>DISEASE TO BE PREVENTED</label>
                        <p style={{fontSize:"1.3rem",marginRight:"20px",fontWeight:"800",marginTop:"5px"}} id="vaccine_prevented"></p>
                    </div>
                    <div className="box">
                        <label>RECOMMENDED AGE OF THE CHILD</label>
                        <p style={{fontSize:"1.3rem",marginRight:"20px",fontWeight:"800",marginTop:"5px"}} id="vaccine_age"></p>
                    </div>
                </div>

                <div className="flex_bot">
                    <div className="box">
                      <label>NUMBER OF DOSE REQUIRED</label>
                      <p style={{fontSize:"1.3rem",marginRight:"20px",fontWeight:"800",marginTop:"5px"}} id="vaccine_dose"></p>
                    </div>
                    <div className="box">
                      <label>DOSE DATE INTERVAL</label>
                      <p style={{fontSize:"1.3rem",marginRight:"20px",fontWeight:"800",marginTop:"5px"}} id="vaccine_intertval"></p>
                    </div>
                </div>
                
            </div>
        </div>   
    </div>
  </div>
)
}