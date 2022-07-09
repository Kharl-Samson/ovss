import React from "react";
import axios from "axios";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorSlideImage from "../../Modals/ImageErrorSlideModal";
import Annoucement_Icon from "./Images/Annoucement_Icon.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Upload_Icon from "./Images/Upload_Icon.png";

export default function AddAnnouncementsPage(){
  let navigate = useNavigate();
  function gotoBackAnnouncement(){
    navigate(`/Administration_Settings`);
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

//Loading the logo and the title on the Tab of the browser
document.querySelector("link[rel='shortcut icon']").href = TabLogo;
document.title = "OVSS | Add Announcement";
    
//Setting the color of active navigation text
setTimeout(function () {
  document.getElementById("left_nav_settings_border").style.borderLeft = "5px solid #4D77FF";
  document.getElementById("admin_Settings_link").style.backgroundColor = "#e7e7ff";
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
  navigate(`/Administration_Settings`);
}

  //Add Announcement form 
  const addAnnounceForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      img: document.getElementById("image_input").value,
      title: document.getElementById("add_announce_title").value,
      date: document.getElementById("add_announce_date").value,
      description: document.getElementById("add_announce_description").value,
    }

    document.getElementsByClassName("text_btn_add_Announce")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_add_Announce")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+"Add_Announcement.php",sendData).then((result)=>{
      if(result.data.status === "Success"){
        document.getElementsByClassName("success_addVaccine_modal")[0].style.display = "flex";
      }
    })//End of axios
    for (let i = 0; i < document.getElementsByName("img_annonce[]").length; i++) {
      data.append("file[]", document.getElementsByName("img_annonce[]")[i].files[0]);
    }
    let url = localStorage.getItem("url_hosting")+"Add_Announcement.php";
    axios.post(url, data, {}).then((res) => {});
  }

return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Add <span style={{color:"#4D77FF"}}>Announcement</span></h1>

           <div className="add_vaccine_container">
           <form onSubmit={addAnnounceForm}>
              <div className="top" style={{borderBottom:"none"}}>
                  <div className="image_container" onMouseOver={hover_image} onMouseOut={out_hover_image}>

                      <img alt="" src={Upload_Icon} style={{height:"35px",witdth:"35px"}} id="upload_img_icon"/>
                      <p id="upload_photo_btn" onClick={selectFile}>Upload image</p>
                      <div className="notes">
                        <p>* png or jpg only</p>
                        <p>* up to 5mb</p>
                        <p>* No whitespaces in file name</p>
                        <p>(ex. sample_name.png)</p>
                      </div>
                      <img alt="" src="" id="vaccine_add_img"/>
                      <div className="cancel_btn">
                        <div onClick={cancel_image}>
                          <CancelIcon style={{marginRight:"5px"}}/>
                          Cancel
                        </div>
                      </div>
                  </div>
                  <input type="file" id="image_file" name="img_annonce[]" accept="image/png, image/jpeg" onChange={() => { loadfile(event);}} style={{display:"none"}} />
                  <input type="hidden" id="image_input"/>

                  <div className="right">
                      <label className="label">Title <span style={{color:"red"}}>*</span></label>
                      <input type="text" placeholder="Announcement title here" className="input_top" id="add_announce_title" required/>

                      <label className="label" style={{marginTop:"20px"}}>Date <span style={{color:"red"}}>*</span></label>
                      <input type="date" className="input_top" id="add_announce_date" required/>
                  </div>
              </div>

              <div style={{display:"flex",flexDirection:"column"}}>
                <label className="label" style={{marginTop:"20px"}}>Description <span style={{color:"red"}}>*</span></label>
                <textarea placeholder="Announcement description here" id="add_announce_description" required></textarea>
              </div>

              <div className="button">
                  <button type="button" style={{backgroundColor:"#ffff", border:"2px solid #4D77FF"}} onClick={gotoBackAnnouncement}>
                      <span style={{color:"#4D77FF"}}>Cancel</span>
                  </button>
                  <button type="submit">
                      <CircularProgress color="inherit" id="progress_btn" className="progress_btn_add_Announce"/>
                      <span className="text_btn_add_Announce">Save</span>
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

    {/*Success add announcement modal */}
    <div className="success_addVaccine_modal">
        <div className="success_vax_container">
            <img src={Annoucement_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully added a new announcement.</p>
            <button onClick={okay_success_modal}>Okay</button>
        </div>
    </div>

  </div>
)
}