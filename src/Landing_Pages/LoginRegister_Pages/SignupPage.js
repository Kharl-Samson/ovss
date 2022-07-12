import React from "react";
import axios from "axios";
import "./LoginRegister.css";
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Left_Login_Bg from "../../Assets/Login_Register/Login_Left_Bg.png";
import Login_Left_Img from "../../Assets/Login_Register/Login_Left_Img.png";
import Show_Password from "../../Assets/Icons/ShowPassword.png";
import Hide_Password from "../../Assets/Icons/HidePassword.png";
import Warning_Icon from "../../Assets/Icons/Warning_Icon.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Signup_Page(){
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

//Showing the toggle password icon when the user is typing in the passform textfield
function show_password_toggle(){
    if(document.getElementById("password_input").value.length === 0 ){
        if( document.getElementById('password_input').type === "text"){
            document.getElementById("show_password").style.display = "none"
            document.getElementById("hide_password").style.display = "block"
        }    
    }
    else{
        if(document.getElementById('password_input').type === "password"){
            document.getElementById("show_password").style.display = "block";
            document.getElementById("hide_password").style.display = "none";
        }     
    }
}
//Showing the password
function show_password(){
    document.getElementById('password_input').type = 'text';
    document.getElementById("show_password").style.display = "none"
    document.getElementById("hide_password").style.display = "block"
}
//Hiding the password
function hide_password(){
    document.getElementById('password_input').type = 'password';
    document.getElementById("show_password").style.display = "block";
    document.getElementById("hide_password").style.display = "none";
}


//Remember me time set
var defaultChecked1 = localStorage.getItem("remember_me1");
setTimeout(function(){
    if(localStorage.getItem("remember_me") !=="not_checked" && localStorage.getItem("remember_me") !== null){
        window.localStorage.setItem('remember_me1', "true");
        }
        else{
            window.localStorage.setItem('remember_me1', '');
        }
},500);
 
//Remember me function
function lsRememberMe1() {
    if (document.getElementById('keep_logA').checked) {//If remember me is checked
        window.localStorage.setItem('email_input', document.getElementById("email_input").value);
        window.localStorage.setItem('password_input', document.getElementById("password_input").value);
        window.localStorage.setItem('remember_me', "checked");
        window.localStorage.setItem('remember_me1', "true");
    } 
    else{//If remember me is not checked
        window.localStorage.setItem('email_input', "");
        window.localStorage.setItem('password_input', "");
        window.localStorage.setItem('remember_me', "not_checked");
        window.localStorage.setItem('remember_me1', '');
    }
}

//Close Login Modal
function close_login_modal(){
    document.getElementById("Login_Modal_Container").style.display = "none";
    document.getElementById("login_validation1").style.display = "none";
    document.getElementById("email_input").value = "";
    document.getElementById("password_input").value = "";
}


//Show Login Modal
function Show_register_modal(){
  document.getElementById("Register_Modal_Container").style.display = "flex";
  document.getElementById("Login_Modal_Container").style.display = "none";
  document.getElementById("login_validation1").style.display = "none";
  document.getElementById("email_input").value = "";
  document.getElementById("password_input").value = "";

  
  document.getElementById("add_register_email").value = "";
  document.getElementById("add_register_fname").value = "";
  document.getElementById("add_register_lname").value = "";
  document.getElementById("add_register_password").value = "";
  document.getElementById("add_register_password1").value = "";  
  document.getElementById("span_email_register").textContent = "*";
  document.getElementsByClassName("register_password_validation")[0].textContent = "*";
  document.getElementsByClassName("register_password_validation")[1].textContent = "*";
  document.getElementById("add_register_email").style.border = "2px solid transparent";

  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
  document.getElementsByClassName("text_btn_register1")[0].style.display = "flex";
  document.getElementsByClassName("progress_btn_register1")[0].style.display = "none";
}

//Function close validation 
function close_validation1(){
  document.getElementById("login_validation1").style.display = "none";
}

const submitForm=(e)=>{
  e.preventDefault();
  //Sending the data request to call it on backend
  const sendData = {
      email: document.getElementById("email_input").value,
      password: document.getElementById("password_input").value,
  }
 
  document.getElementById("progress_btn").style.display = "block";
  document.getElementById("sign_in_Text_patient").style.display =  "none";
  axios.post(localStorage.getItem("url_hosting")+'Patient_Login.php',sendData)
  .then((result)=>{
     
      if(result.data.status === "Patient Login"){
         document.getElementById("progress_btn").style.display = "none";
         document.getElementById("sign_in_Text_patient").style.display =  "block";

         window.localStorage.setItem('patient_login_email', result.data.email);
         window.localStorage.setItem('patient_login_photo', result.data.photo);
         window.localStorage.setItem('patient_login_fullname', result.data.fname+" "+result.data.lname);
         window.localStorage.setItem('patient_login_firstname', result.data.fname);
         window.localStorage.setItem('patient_login_middlename', result.data.mname);
         window.localStorage.setItem('patient_login_lastname', result.data.lname);
         window.localStorage.setItem('patient_login_contact', result.data.contact);
         window.localStorage.setItem('patient_login_id', result.data.id);
         window.localStorage.setItem('patient_account_status', result.data.account_status);
        
         navigate(`/Patient_Dashboard`);
      }
      else if(result.data.status === "Invalid"){ //If email or password is invalid
          document.getElementById("progress_btn").style.display = "none";
          document.getElementById("sign_in_Text_patient").style.display =  "block";

          document.getElementById("validation_text1").textContent = "Email or password are invalid!"
          document.getElementById("login_validation1").style.display = "flex";
      }

  })    
}


return(
  <div className="LoginRegister_Container Login_Modal_Container" id="Login_Modal_Container">
    <div className="LoginForm_Container">
        <div className="left" 
         style={{
            backgroundImage: `url(${Left_Login_Bg})`
        }}
        >
            <div className="top">
              <div>
                <p>Let's protect yourself</p>
                <p>and those around you</p>
                <p>by vaccinating</p>
              </div>
            </div>
            <div className="bottom">
                <img src={Login_Left_Img} alt=""/> 
            </div>
        </div>

        <div className="right">
            <p className="close_login_modal">
            <LightTooltip title="Close">
                <span onClick={close_login_modal}>&#215;</span>
            </LightTooltip>
            </p>

          <div className="right_container">
          <form onSubmit={submitForm}>
            <h1>Welcome Back!</h1>
            <p className="new_here_text"><b>New here?</b>&nbsp;&nbsp; <span onClick={Show_register_modal}>Sign up</span></p>

            <p className="label">Email or username</p>
            <input type="text" placeholder="Email or username here" className="email_input" id="email_input" defaultValue={localStorage.getItem("email_input")} onChange={close_validation1}  required />

            <p className="label" style={{marginTop:"5%"}}>Password</p>
            <div className="password_input_container">
              <input type="password" 
                placeholder="Password here" 
                className="password_input"
                id="password_input"
                onKeyUp={show_password_toggle}
                onChange={close_validation1} 
                defaultValue={localStorage.getItem("password_input")}
                required
              />
              <div className="toggle_password_container">
                <img src={Show_Password} id="show_password" onClick={show_password} alt="" title="Show Password"/>
                <img src={Hide_Password} id="hide_password" onClick={hide_password} alt="" title="Hide Password"/>
              </div>
            </div>

            <div className="rememberMe_ForgotPassword">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
                <div className="left">
                    <Checkbox
                      defaultChecked={defaultChecked1} 
                      id="keep_logA"
                      {...label}
                      sx={{
                      color: blue[400],
                      '&.Mui-checked': {
                      color: blue[600],
                      },
                      padding: 0,
                      margin: 0,
                      }}
                    />
                    Remember me
                </div>
                <div className="right"><span>Forgot Password?</span></div>
            </Grid>   
            </div>

            <div className="login_validation" id="login_validation1">
              <img src={Warning_Icon} alt="" style={{display:"flex"}}/>
              <p id="validation_text1">!</p>
            </div>

            <div className="signIn_btn">
                <button onClick={lsRememberMe1} type="submit">
                  <CircularProgress color="inherit" id="progress_btn" style={{color:"white",margin:"0"}}/>
                  <div id="sign_in_Text_patient" style={{color:"white"}}>Sign in</div>
                </button>
            </div>
           </form>
          </div>

        </div>
    </div>
  </div>
)
}
