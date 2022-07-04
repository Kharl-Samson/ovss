import React from "react";
import Vaccine_Icon from "./Images/Vaccine_Icon.png";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditVaccine(props){

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
        document.getElementById("edit_vaccine_container").style.display = "none";
    }, 400);
    document.getElementById("edit_container").style.marginRight = "-100%";
  }

//Clicking upload photo in edit medicine
function selectFile(){
    document.getElementById('image_file').click();
}
//Removing photo in edit vaccine
function removeFile(){
    document.getElementById("image_file").value = null;
    document.getElementById("image_input").value = "";
    document.getElementById("vaccine_image_edit").src = localStorage.getItem("url_vaccine")+"default_img.jpg";
}
/* eslint no-restricted-globals:0 */
function loadfile(event){
    document.getElementById("image_input").value = document.getElementById("image_file").files[0].name;
    var output=document.getElementById("vaccine_image_edit");
    output.src=URL.createObjectURL(event.target.files[0]);
};


return(
  <div className="edit_vaccine_container" id="edit_vaccine_container">  
    <form id="edit_container" onSubmit={props.formAction}>
    <div className="edit_container">
        <div className="close_btn">
          <LightTooltip title="Close">
            <span onClick={CloseVaccineModal}>&#xd7;</span>
          </LightTooltip> 
        </div>

        <div className="top">
            <div className="first">
               <img alt="" src={Vaccine_Icon}/>
                <p>Edit Vaccine <span style={{color:"#4D77FF"}}>Information</span></p>
            </div>

            <div className="second">
              <div className="left">
                <img alt="" id="vaccine_image_edit" 
                src=""
                onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_vaccine")+"default_img.jpg"}}/>
              </div>
              <div className="right">
                <div className="upload_btn" onClick={selectFile}>Upload Photo</div>
                <div className="remove_btn" onClick={removeFile}>Remove</div>
                <input type="file" id="image_file" name="img_vaccine[]" accept="image/png, image/jpeg" onChange={() => { loadfile(event);}} style={{display:"none"}}/>
                <input type="hidden" id="image_input"/>
              </div>
            </div>
        </div> 

        <div className="bottom">
            <div className="content">
                <label>Vaccine Name <span style={{color:"red"}}>*</span></label>
                <input type="text" placeholder="Vaccine name here" id="edit_vax_name" required/>

                <label style={{marginTop:"20px"}}>Vaccine Abbreviation <span style={{color:"red"}}>*</span></label>
                <input type="text" placeholder="Just copy the name if no abbreviation" id="edit_vax_abbreviation" required/>

                <label style={{marginTop:"20px"}}>Vaccine Description <span style={{color:"red"}}>*</span></label>
                <textarea placeholder="Vaccine description here" id="edit_vax_descripiton" required></textarea>

                <label style={{marginTop:"20px"}}>Disease to be Prevented <span style={{color:"red"}}>*</span></label>
                <input type="text" placeholder="Write the disease here" id="edit_vax_disease" required/>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                     <label>Child Age <span style={{color:"red"}}>*</span></label>
                     <input type="number" id="edit_vax_age" placeholder="Digits. Ex. 30" required/>
                  </div>
                  <div className="box">
                    <label>No. of Dosage Required <span style={{color:"red"}}>*</span></label>
                    <input type="number" id="edit_vax_dosage" placeholder="Dosage here. Ex. 3" required/>
                  </div>
                </div>

                <label style={{marginTop:"20px"}}>Days Interval <span style={{color:"red"}}>*</span></label>
                <input type="number" id="edit_vax_days" placeholder="Days interval. Ex. 30" required/>

                <div className="button">
                    <input type="hidden" id="edit_vax_id"/>
                    <button type="button" onClick={CloseVaccineModal}>Cancel</button>
                    <button type="submit">
                      <CircularProgress color="inherit" id="progress_btn" className="progress_btn_edit_Vax"/>
                      <span className="text_btn_edit_Vax">Save</span>
                    </button>
                </div>

            </div>
        </div>   
    </div>
    </form>
  </div>
)
}