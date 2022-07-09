import React ,{  useEffect, useState } from "react";
import axios from "axios";
import Admin_Left_Navigation_Bar from "../Navigation_Bar/Left_Nav";
import Admin_Right_Navigation_Bar from '../Navigation_Bar/Right_Nav';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TabLogo from "../../Assets/Logo/Tab_Logo.png";
import ErrorSlideImage from "../../Modals/ImageErrorSlideModal";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Show_Password from "../../Assets/Icons/ShowPassword.png";
import Hide_Password from "../../Assets/Icons/HidePassword.png";
import ValidatorSlideModal from "../../Modals/ValidatorSlideModal";
import Done_Icon from "./Images/Done_Icon.png";
import SuccesSlideModal from "../../Modals/SuccesSlideModal";

export default function Admin_ChangePassword(){
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
document.title = "OVSS | Change Password";
    
//Function click okay in success modal
function okay_success_modal(){
  navigate(`/Administration_View_Profile`);
}


//Showing the toggle password icon when the user is typing in the passform textfield
function show_password_toggle(){
    if(document.getElementById("profile_current_pass").value.length === 0 ){
        if( document.getElementById('profile_current_pass').type === "text"){
            document.getElementById("show_password").style.display = "none"
            document.getElementById("hide_password").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('profile_current_pass').type === "password"){
            document.getElementById("show_password").style.display = "block";
            document.getElementById("hide_password").style.display = "none";
        }     
    }
}
function show_password_toggle1(){
    if(document.getElementById("profile_new_pass").value.length === 0 ){
        if( document.getElementById('profile_new_pass').type === "text"){
            document.getElementById("show_password1").style.display = "none"
            document.getElementById("hide_password1").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('profile_new_pass').type === "password"){
            document.getElementById("show_password1").style.display = "block";
            document.getElementById("hide_password1").style.display = "none";
        }     
    }
}
function show_password_toggle2(){
    if(document.getElementById("profile_new_pass1").value.length === 0 ){
        if( document.getElementById('profile_new_pass1').type === "text"){
            document.getElementById("show_password2").style.display = "none"
            document.getElementById("hide_password2").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('profile_new_pass1').type === "password"){
            document.getElementById("show_password2").style.display = "block";
            document.getElementById("hide_password2").style.display = "none";
        }     
    }
}

//Showing the password
function show_password(){
    document.getElementById('profile_current_pass').type = 'text';
    document.getElementById("show_password").style.display = "none"
    document.getElementById("hide_password").style.display = "block"
}
function show_password1(){
    document.getElementById('profile_new_pass').type = 'text';
    document.getElementById("show_password1").style.display = "none"
    document.getElementById("hide_password1").style.display = "block"
}
function show_password2(){
    document.getElementById('profile_new_pass1').type = 'text';
    document.getElementById("show_password2").style.display = "none"
    document.getElementById("hide_password2").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('profile_current_pass').type = 'password';
    document.getElementById("show_password").style.display = "block";
    document.getElementById("hide_password").style.display = "none";
}
function hide_password1(){
    document.getElementById('profile_new_pass').type = 'password';
    document.getElementById("show_password1").style.display = "block";
    document.getElementById("hide_password1").style.display = "none";
}
function hide_password2(){
    document.getElementById('profile_new_pass1').type = 'password';
    document.getElementById("show_password2").style.display = "block";
    document.getElementById("hide_password2").style.display = "none";
}

//Password Validator
function Currentpass_isMatch(){
    var current_password_key = document.getElementById('profile_current_pass_key').value;
    var current_password = document.getElementById('profile_current_pass').value;
    if(current_password_key !== current_password && current_password.length !== 0){
        document.getElementsByClassName("error_password_validation")[0].style.visibility = "visible";
        document.getElementsByClassName("error_password_validation")[0].textContent = "Your current password is wrong";
    }
    else{
        document.getElementsByClassName("error_password_validation")[0].style.visibility = "hidden";
        document.getElementsByClassName("error_password_validation")[0].textContent = ".";
    }
}
function password_validator(){
    var new_password = document.getElementById('profile_new_pass').value;
    if(new_password.length < 8 && new_password.length >= 1){
        document.getElementsByClassName("error_password_validation")[1].style.visibility = "visible";
        document.getElementsByClassName("error_password_validation")[1].textContent = "Password must be atleast eight characters long";
    }
    else if(new_password.length === 0){
        document.getElementsByClassName("error_password_validation")[1].style.visibility = "hidden";
        document.getElementsByClassName("error_password_validation")[1].textContent = ".";
    }
    else{
        document.getElementsByClassName("error_password_validation")[1].style.visibility = "hidden";
        document.getElementsByClassName("error_password_validation")[1].textContent = ".";
    }
}
function password_isMatch(){
    var new_password = document.getElementById('profile_new_pass').value;
    var confirm_password = document.getElementById('profile_new_pass1').value;
    if(new_password !== confirm_password && confirm_password.length !== 0){
        document.getElementsByClassName("error_password_validation")[2].style.visibility = "visible";
        document.getElementsByClassName("error_password_validation")[2].textContent = "New password and confirm does'n match";
    }
    else{
        document.getElementsByClassName("error_password_validation")[2].style.visibility = "hidden";
        document.getElementsByClassName("error_password_validation")[2].textContent = ".";
    }
}

//Profile key
var key_profile = localStorage.getItem("admin_login_email");
//Loading while fetching data in axios
const [loading,setLoading] = useState(false);
//Hook for view the list of patients
const [profile, setProfile] = useState([]);  
const loadProfile = async () =>{
    const result = await axios.get(localStorage.getItem("url_hosting")+"List_Of_Admin.php");
    setLoading(true);
    setProfile(result.data.phpresult);
};
useEffect(() => {
    loadProfile();
}, []);

//Edit Password form 
const EditPasswordForm=(e)=>{
    e.preventDefault();      
    //Sending the data request to call it on backend
    const sendData = {
      id: localStorage.getItem("admin_login_email"),
      newP: document.getElementById("profile_new_pass").value,
    }
    document.getElementsByClassName("text_btn_password")[0].style.display = "none";
    document.getElementsByClassName("progress_btn_password")[0].style.display = "flex";
    if(document.getElementsByClassName("error_password_validation")[0].textContent === "." &&
       document.getElementsByClassName("error_password_validation")[1].textContent === "." &&
       document.getElementsByClassName("error_password_validation")[2].textContent === "."){
        axios.post(localStorage.getItem("url_hosting")+"Edit_Of_AdminPassword.php",sendData).then((result)=>{
            if(result.data.status === "Success"){
              loadProfile();
              document.getElementById("slide_modal_container").style.left = "75px";
              setTimeout(function () {
                document.getElementById("slide_modal_container").style.left = "-100%";
              }, 2000);
              document.getElementsByClassName("text_btn_password")[0].style.display = "flex";
              document.getElementsByClassName("progress_btn_password")[0].style.display = "none";
              
              document.getElementById('profile_current_pass').value = "";
              document.getElementById('profile_new_pass').value = "";
              document.getElementById('profile_new_pass1').value = "";
            }
        })//End of axios
    }
    else{
        document.getElementsByClassName("text_btn_password")[0].style.display = "flex";
        document.getElementsByClassName("progress_btn_password")[0].style.display = "none";
    }
  }


var array_profile_ctr = 0;
const Password = profile.map((res) => {
  array_profile_ctr++;
  if(key_profile === res.email)
  return (
 <div className="add_patient_container" key={array_profile_ctr}>
 <form onSubmit={EditPasswordForm}>
    <h1 style={{marginTop:"0"}}>Change Password</h1>
    <input type="hidden" value={res.password} id="profile_current_pass_key"/>
    <p className="label_password" style={{marginTop:"5vh"}}>Current Password <span style={{color:"red"}}>*</span></p>
    <div className="password_input_container">
      <input type="password" 
          placeholder="Current password here" 
          className="password_input"
          id="profile_current_pass"
          onChange={Currentpass_isMatch}
          onKeyUp={show_password_toggle}
          required
      />
      <div className="toggle_password_container">
          <img src={Show_Password} id="show_password" alt="" title="Show Password" onClick={show_password}/>
          <img src={Hide_Password} id="hide_password" alt="" title="Hide Password" onClick={hide_password}/>
      </div>
    </div>
    <p className="error_password_validation">.</p> 
    <p className="label_password" style={{marginTop:"1vh"}}>New Password <span style={{color:"red"}}>*</span></p>
    <div className="password_input_container">
      <input type="password" 
          placeholder="New password here" 
          className="password_input"
          id="profile_new_pass"
          onChange={password_validator}
          onKeyUp={show_password_toggle1}
          required
      />
      <div className="toggle_password_container">
          <img src={Show_Password} id="show_password1" alt="" title="Show Password" onClick={show_password1}/>
          <img src={Hide_Password} id="hide_password1" alt="" title="Hide Password" onClick={hide_password1}/>
      </div>
    </div>
    <p className="error_password_validation">.</p>

    <p className="label_password" style={{marginTop:"1vh"}}>Confirm New Password <span style={{color:"red"}}>*</span></p>
    <div className="password_input_container">
      <input type="password" 
          placeholder="Confirm new password here" 
          className="password_input"
          id="profile_new_pass1"
          onChange={password_isMatch}
          onKeyUp={show_password_toggle2}
          required
      />
      <div className="toggle_password_container">
          <img src={Show_Password} id="show_password2" alt="" title="Show Password" onClick={show_password2}/>
          <img src={Hide_Password} id="hide_password2" alt="" title="Hide Password" onClick={hide_password2}/>
      </div>
    </div>
    <p className="error_password_validation">.</p>

    <div className="button_submit" style={{justifyContent:"flex-start"}}>
      <button type="submit">
        <CircularProgress color="inherit" id="progress_btn" className="progress_btn_password" />
        <span className="text_btn_password">Save Changes</span>
      </button>
    </div>
  </form> 
  </div>
  ); 
});


return(
    <div className="admin_schedule_container">
    <Admin_Left_Navigation_Bar/>

    <div className="admin_content">
      <div className="admin_main_content">
        <div className="container">
          <h1>Account <span style={{color:"#4D77FF"}}>Settings</span></h1>
              {loading ? 
                Password
              :
               <div div className='no_schedule_available'>
                <CircularProgress style={{height:"60px",width:"60px"}}/>
               </div> 
              }
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
    {/*Success slide modal*/}
    <SuccesSlideModal/>

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

