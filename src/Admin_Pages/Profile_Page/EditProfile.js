import React ,{ Children, useEffect, useState } from "react";
import axios from "axios";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorSlideImage from "../../Modals/ImageErrorSlideModal";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Upload_Icon from "./Images/Upload_Icon.png";
import validator from 'validator';
import ValidatorSlideModal from "../../Modals/ValidatorSlideModal";
import Done_Icon from "./Images/Done_Icon.png";

export default function Admin_EditProfile(){
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
document.title = "OVSS | Update Profile";
    
//Showing cancel when the image is hover
function hover_image(){
    var x = document.getElementById("patient_add_img");
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
    document.getElementById("patient_add_img").style.display = "none";
    document.getElementById("image_file").value = null;
    document.getElementById("image_input_edit_profile").value = "";
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
      document.getElementById("image_input_edit_profile").value = "";
    }
    else{
      document.getElementById("image_input_edit_profile").value = document.getElementById("image_file").files[0].name;
      var output=document.getElementById("patient_add_img");
      output.src=URL.createObjectURL(event.target.files[0]);
      document.getElementsByClassName("cancel_btn")[0].style.display="none";
      document.getElementById("upload_img_icon").style.display = "none";
      document.getElementById("patient_add_img").style.display = "block";
      document.getElementsByClassName("notes")[0].style.display = "none";
      document.getElementById("upload_photo_btn").style.display = "none";
    }
  };


//Validate Phone number
function phonenumber() {
 var phone = document.getElementById("edit_contact").value;
 var phoneno = /^(09|\+639)\d{9}$/;
 if (phone.length !== 0 && phone.length !== 11) {
    document.getElementById("edit_contact").style.border = "2px solid red";
    document.getElementById("span_contact").textContent = "* Invalid number";
 } else if (phone.length === 0) {
    document.getElementById("edit_contact").style.border = "2px solid #b9c5d2";
    document.getElementById("span_contact").textContent = "*";
 } else if (!phone.match(phoneno)) {
    document.getElementById("edit_contact").style.border = "2px solid red";
    document.getElementById("span_contact").textContent = "* Invalid number";
 } else {
    document.getElementById("edit_contact").style.border = "2px solid #b9c5d2";
    document.getElementById("span_contact").textContent = "*";
 }
}

//Edit Profile form 
const EditProfileForm=(e)=>{
    e.preventDefault();
    const data = new FormData();          
    //Sending the data request to call it on backend
    const sendData = {
      id: document.getElementById("edit_id").value,
      img: document.getElementById("image_input_edit_profile").value,
      fname: document.getElementById("edit_fname").value,
      mname: document.getElementById("edit_mname").value,
      lname: document.getElementById("edit_lname").value,
      email: document.getElementById("edit_email").value,
      contact: document.getElementById("edit_contact").value,
    }
    document.getElementsByClassName("text_btn_add_profile")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_add_Profile")[0].style.display = "flex";
    axios.post(localStorage.getItem("url_hosting")+"Edit_Of_AdminProfile.php",sendData).then((result)=>{
      if(result.data.status === "Success"){
        window.localStorage.setItem('admin_login_photo', document.getElementById("image_input_edit_profile").value);
        window.localStorage.setItem('admin_login_fullname', document.getElementById("edit_fname").value+" "+document.getElementById("edit_lname").value);
        window.localStorage.setItem('admin_login_firstname', document.getElementById("edit_fname").value);
        window.localStorage.setItem('admin_login_middlename', document.getElementById("edit_mname").value);
        window.localStorage.setItem('admin_login_lastname', document.getElementById("edit_lname").value);
        window.localStorage.setItem('admin_login_contact', document.getElementById("edit_contact").value);
        document.getElementsByClassName("success_addPatient_modal")[0].style.display = "flex";
      }
    })//End of axios
    for (let i = 0; i < document.getElementsByName("img_profile[]").length; i++) {
        data.append("file[]", document.getElementsByName("img_profile[]")[i].files[0]);
    }
    let url = localStorage.getItem("url_hosting")+"Edit_Of_AdminProfile.php";
    axios.post(url, data, {}).then((res) => {});
  }
  

//Function click okay in success modal
function okay_success_modal(){
  navigate(`/Administration_View_Profile`);
}


return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Edit <span style={{color:"#4D77FF"}}>Profile</span></h1>

           <div className="add_patient_container">
           <form onSubmit={EditProfileForm}>
              <div className="top" style={{borderBottom:"none",paddingBottom:"0"}}>
                <div div className="image_container" onMouseOver={hover_image} onMouseOut={out_hover_image}>
                    <img alt="" src={Upload_Icon} style={{height:"35px",witdth:"35px",display:"none"}} id="upload_img_icon"/>
                    <p id="upload_photo_btn" onClick={selectFile} style={{display:"none"}}>Upload profile image</p>
                    <div className="notes" style={{display:"none"}}>
                      <p>* This is optional</p>
                      <p>* png or jpg only</p>
                      <p>* up to 5mb</p>
                      <p>* No whitespaces in file name</p>
                      <p>(ex. my_photo.png)</p>
                    </div>
                    <img alt="" id="patient_add_img" style={{display:"block"}}
                    src={localStorage.getItem("url_admin_img")+localStorage.getItem("admin_login_photo")}
                    onError={(e)=>{e.target.onerror = null; e.target.src=localStorage.getItem("url_admin_img")+"Default_Avatar.png"}}
                    />

                    <div className="cancel_btn">
                      <div onClick={cancel_image}>
                        <CancelIcon style={{marginRight:"5px"}}/>
                        Cancel
                      </div>
                    </div>
                </div>
                <input type="file" id="image_file" name="img_profile[]" accept="image/png, image/jpeg" onChange={() => { loadfile(event);}} style={{display:"none"}} />
                <input type="hidden" id="image_input_edit_profile" defaultValue={localStorage.getItem("admin_login_photo")}/>
                <div className="right">
                    <label className="label">First Name <span style={{color:"red"}}>*</span></label>
                    <input type="text" defaultValue={localStorage.getItem("admin_login_firstname")} placeholder="First name here" className="input_top" id="edit_fname" required/>

                    <label className="label" style={{marginTop:"20px"}}>Middle Name</label>
                    <input type="text" defaultValue={localStorage.getItem("admin_login_middlename")} placeholder="This is optional" className="input_top" id="edit_mname"/>

                    <label className="label" style={{marginTop:"20px"}}>Last Name <span style={{color:"red"}}>*</span></label>
                    <input type="text" defaultValue={localStorage.getItem("admin_login_lastname")} placeholder="Last name here" className="input_top" id="edit_lname" required/>
                  </div>
              </div>

              <div style={{display:"flex",flexDirection:"column"}}>

                <div className="flex_bot" style={{marginTop:"20px"}}>
                  <div className="box">
                    <label className="label">Email <span style={{color:"red"}} id="span_email">*</span></label>
                    <input type="text" defaultValue={localStorage.getItem("admin_login_email")} placeholder="Email here" id="edit_email" className="input_top" readOnly style={{backgroundColor:"#EBEBEB"}}/>
                  </div>
                  <div className="box">
                    <label className="label">Contact # <span style={{color:"red"}} id="span_contact">*</span></label>
                    <input type="number" defaultValue={localStorage.getItem("admin_login_contact")} placeholder="Ex. 09196712224" id="edit_contact" className="input_top" required onChange={phonenumber}/>
                  </div>
                </div>

                <br/>
                <input type="hidden" defaultValue={localStorage.getItem("admin_login_id")} id="edit_id"/>

                <div className="button_submit" style={{justifyContent:"flex-end"}}>
                    <button type="submit">
                        <CircularProgress color="inherit" id="progress_btn" className="progress_btn_add_Profile" />
                        <span className="text_btn_add_profile">Update</span>
                    </button>
                </div>
              </div>

           </form> 
           </div>

        </div>
      </div>
      <Admin_Right_Navigation_Bar/>
    </div>

    {/*Error if the image is too big modal */}
    <ErrorSlideImage/>
    {/*Validator slide modal */}
    <ValidatorSlideModal
        validatorText = "You have an error in your form"
    />

    {/*Success add vaccine modal */}
    <div className="success_addPatient_modal">
        <div className="success_patient_container">
            <img src={Done_Icon} alt=""/>
            <p className="head_text">Successful!</p>
            <p>You have successfully updated your profile.</p>
            <button onClick={okay_success_modal}>Okay</button>
        </div>
    </div>

 
  </div>
)
}

