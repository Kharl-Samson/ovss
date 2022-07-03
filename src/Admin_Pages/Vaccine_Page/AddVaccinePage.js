import React from "react";
import axios from "axios";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorSlideImage from "../../Modals/ImageErrorSlideModal";
import Vaccine_Icon from "./Images/Vaccine_Icon.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Upload_Icon from "./Images/Upload_Icon.png";

export default function AddVaccinePage(){
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

//Loading the logo and the title on the Tab of the browser
document.querySelector("link[rel='shortcut icon']").href = TabLogo;
document.title = "OVSS | Add Vaccine";
    
//Setting the color of active navigation text
setTimeout(function () {
    document.getElementById("link_add_vaccine").style.pointerEvents="none";
    document.getElementById("admin_Add_Vaccine_link").style.backgroundColor = "#e7e7ff";
    document.getElementById("left_nav_Add_Vaccine_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("left_nav_vaccine_border").style.borderLeft = "5px solid #4D77FF";
    document.getElementById("admin_vax_link").style.backgroundColor = "#e7e7ff";
}, 10);

//Showing cancel when the image is hover
function hover_image(){
  var x = document.getElementById("vaccine_add_img");
  if(window.getComputedStyle(x).display !== "none"){
    document.getElementsByClassName("cancel_btn")[0].style.display="flex";
  }
  else{
    document.getElementsByClassName("cancel_btn")[0].style.display="none";
  }
}
//On mouse out image hover
function out_hover_image(){
  document.getElementsByClassName("cancel_btn")[0].style.display="none";
}
//Click cancel in image hover
function cancel_image(){
  document.getElementsByClassName("notes")[0].style.display = "block";
  document.getElementById("upload_photo_btn").style.display = "block";
  document.getElementById("upload_img_icon").style.display = "block";
  document.getElementsByClassName("cancel_btn")[0].style.display="none";
  document.getElementById("vaccine_add_img").style.display = "none";
  document.getElementById("image_file").value = null;
  document.getElementById("image_input").value = "";
}
//Clicking upload photo in edit medicine
function selectFile(){
  document.getElementById('image_file').click();
}
/* eslint no-restricted-globals:0 */
function loadfile(event){
  if(document.getElementById("image_file").files[0].size > 5242880){//If file size is bigger than 5mb
    document.getElementById("image_istoobig_container").style.left = "75px";
    setTimeout(function () {
      document.getElementById("image_istoobig_container").style.left = "-100%";
    }, 2000);
    document.getElementById("image_file").value = null;
    document.getElementById("image_input").value = "";
  }
  else{
    document.getElementById("image_input").value = document.getElementById("image_file").files[0].name;
    var output=document.getElementById("vaccine_add_img");
    output.src=URL.createObjectURL(event.target.files[0]);
    document.getElementsByClassName("cancel_btn")[0].style.display="none";
    document.getElementById("upload_img_icon").style.display = "none";
    document.getElementById("vaccine_add_img").style.display = "block";
    document.getElementsByClassName("notes")[0].style.display = "none";
    document.getElementById("upload_photo_btn").style.display = "none";
  }
};


//Function click okay in success modal
function okay_success_modal(){
  navigate(`/Administration_Vaccine_Management`);
}

  //Edit vaccine form 
  const addVaccineForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      name: document.getElementById("add_vax_name").value,
      abbreviation: document.getElementById("add_vax_abbreviation").value,
      description: document.getElementById("add_vax_descripiton").value,
      prevented: document.getElementById("add_vax_disease").value,
      age: document.getElementById("add_vax_age").value,
      dose_no: document.getElementById("add_vax_dosage").value,
      days_interval: document.getElementById("add_vax_days").value,
      image: document.getElementById("image_input").value,
    }

    document.getElementsByClassName("text_btn_add_Vax")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_add_Vax")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+"Add_Vaccine.php",sendData).then((result)=>{
      console.log(result.data)
      if(result.data.status === "Success"){
        document.getElementsByClassName("success_addVaccine_modal")[0].style.display = "flex";
      }
    })//End of axios
    for (let i = 0; i < document.getElementsByName("img_vaccine[]").length; i++) {
      data.append("file[]", document.getElementsByName("img_vaccine[]")[i].files[0]);
    }
    let url = localStorage.getItem("url_hosting")+"Add_Vaccine.php";
    axios.post(url, data, {}).then((res) => {});
  }

return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Add <span style={{color:"#4D77FF"}}>Vaccines</span></h1>

           <div className="add_vaccine_container">
           <form onSubmit={addVaccineForm}>
              <div className="top">
                  <div className="image_container" onMouseOver={hover_image} onMouseOut={out_hover_image}>

                      <img alt="" src={Upload_Icon} style={{height:"35px",witdth:"35px"}} id="upload_img_icon"/>
                      <p id="upload_photo_btn" onClick={selectFile}>Upload vaccine image</p>
                      <div className="notes">
                        <p>* png or jpg only</p>
                        <p>* up to 5mb</p>
                        <p>* No whitespaces in file name</p>
                        <p>(ex. vaccine_name.png)</p>
                      </div>
                      <img alt="" src={localStorage.getItem("url_vaccine")+"ipv.png"} id="vaccine_add_img"/>
                      <div className="cancel_btn">
                        <div onClick={cancel_image}>
                          <CancelIcon style={{marginRight:"5px"}}/>
                          Cancel
                        </div>
                      </div>
                  </div>
                  <input type="file" id="image_file" name="img_vaccine[]" accept="image/png, image/jpeg" onChange={() => { loadfile(event);}} style={{display:"none"}} />
                  <input type="hidden" id="image_input"/>

                  <div className="right">
                      <label className="label">Vaccine Name <span style={{color:"red"}}>*</span></label>
                      <input type="text" placeholder="Vaccine name here" className="input_top" id="add_vax_name" required/>

                      <label className="label" style={{marginTop:"20px"}}>Vaccine Abbreviation <span style={{color:"red"}}>*</span></label>
                      <input type="text" placeholder="Just copy the name if no abbreviation" className="input_top" id="add_vax_abbreviation" required/>
                  </div>
              </div>

              <div style={{display:"flex",flexDirection:"column"}}>
                <label className="label" style={{marginTop:"20px"}}>Vaccine Description <span style={{color:"red"}}>*</span></label>
                <textarea placeholder="Vaccine description here" id="add_vax_descripiton" required></textarea>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                      <label className="label">Disease to be Prevented <span style={{color:"red"}}>*</span></label>
                      <input type="text" placeholder="Write the disease here" id="add_vax_disease" className="input_top" required/>
                  </div>
                  <div className="box">
                      <label className="label">Child Age <span style={{color:"red"}}>*</span></label>
                      <input type="number" placeholder="Input exact days. Ex. 30" id="add_vax_age" className="input_top" required/>
                  </div>
                </div>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                      <label className="label">No. of Dosage Required <span style={{color:"red"}}>*</span></label>
                      <input type="number" placeholder="Dosage here. Ex. 3" id="add_vax_dosage" className="input_top" required/>
                  </div>
                  <div className="box">
                      <label className="label">Days Interval <span style={{color:"red"}}>*</span></label>
                      <input type="number" placeholder="Days interval. Ex. 30" id="add_vax_days" className="input_top" required/>
                  </div>
                </div>
              </div>

              <div className="button">
                  <button type="submit">
                      <center>
                        <CircularProgress color="inherit" id="progress_btn" className="progress_btn_add_Vax"/>
                        <span className="text_btn_add_Vax">Save Changes</span>
                      </center>
                  </button>
              </div>

           </form> 
           </div>

        </div>
      </div>
      <Admin_Right_Navigation_Bar/>
    </div>

    {/*Error if the image is too big modal */}
    <ErrorSlideImage/>

    {/*Success add vaccine modal */}
    <div className="success_addVaccine_modal">
        <div className="success_vax_container">
            <img src={Vaccine_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully added a new vaccine.</p>
            <button onClick={okay_success_modal}>Okay</button>
        </div>
    </div>

  </div>
)
}